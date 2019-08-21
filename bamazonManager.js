var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Dramatiks33#",
    database: "bamazonDB"
})



function start() {
    inquirer
        .prompt([

            {
                type: "list",
                message: "What would you like to do?",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                name: "action"
            }
        ]).then(function (ans) {
            // Function for determining which command is executed

            switch (ans.action) {
                case "View Products for Sale":
                    // getProdcuts();
                    viewProducts();
                    break;
                case "View Low Inventory":
                    // lowInventory();
                    lowInventory();
                    break;
                case "Add to Inventory":
                    // addToInventory();
                    addToInventory();
                    break;
                case "Add New Product":
                    // addNewProduct();
                    addNewProduct();
                    break;
                default:
                    console.log("Please make a selection");
            }
        });
}
start();

//views all inventory

function viewProducts() {

    console.log(">>>>>>>>>>>>>>>>>>Viewing Products<<<<<<<<<<<<<<<<<<<<");

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("-----------------------------------------------------------------------")

        for (var i = 0; i < res.length; i++) {

            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
            console.log('--------------------------------------------------------------------------------------------------')
        }

        start();

    });


}

// views inventory lower than 5 

function lowInventory() {

    console.log(">>>>>>>>>>>>>>>>>>>>>>>> Warning Low Inventory! <<<<<<<<<<<<<<<<<<");

    connection.query("SELECT * FROM products", function (err, res) {

        if (err) throw err;

        console.log("-------------------------------------------------------------------------------------------------");

        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
                console.log("-------------------------------------------------------------------------------------------------");
            }

        }

        start();



    });



}

// addToInventory function Displays a prompt that will let the manager "add more" of any item currently in the store.

function addToInventory() {

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>> Adding to Inventory <<<<<<<<<<<<<<<<<<<<<<<<<<");

    connection.query("SELECT * FROM products", function (err, res) {

        if (err) throw err;
        var newArray = [];
        //push each item into newArray
        for (var i = 0; i < res.length; i++) {
            newArray.push(res[i].product_name);
        }

        inquirer.prompt([
            {

                type: "list",
                name: "product",
                choices: newArray,
                message: "Which item would you to Add inventory?"



            },

            {
                type: "input",
                name: "quantity",
                message: "How many Units would you like to add?",
                validate: function (value) {
                    if (isNaN(value) === false) { return true; }
                    else { return false; }

                }





            }

        ]).then(function (ans) {
            var currentQuantity;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === ans.product) {
                    currentQuantity = res[i].stock_quantity;
                }

            }

            connection.query("UPDATE products SET ? WHERE ?", [
                { stock_quantity: currentQuantity + parseInt(ans.quantity) },
                { product_name: ans.product }



            ], function (err, res) {
                if (err) throw err;
                console.log("The Quanity was updated.");
                start();

            });



        })



    });



}

//allows manager to add a completely new product to store
function addNewProduct() {
    console.log(">>>>>>Adding New Product<<<<<<");
    var newProduct = [];

    //add to Products Table
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            newProduct.push(res[i].product_name);
        }
    })

    inquirer.prompt([{
        type: "input",
        name: "product",
        message: "Product: ",
        validate: function (value) {
            if (value) { return true; }
            else { return false; }
        }
    }, {
        type: "list",
        name: "department",
        message: "Department: ",
        choices: deptNames
    }, {
        type: "input",
        name: "price",
        message: "Price: ",
        validate: function (value) {
            if (isNaN(value) === false) { return true; }
            else { return false; }
        }
    }, {
        type: "input",
        name: "quantity",
        message: "Quantity: ",
        validate: function (value) {
            if (isNaN(value) == false) { return true; }
            else { return false; }
        }
    }]).then(function (ans) {
        connection.query("INSERT INTO products SET ?", {
            product_name: ans.product,
            department_name: ans.department,
            price: ans.price,
            stock_quantity: ans.quantity
        }, function (err, res) {
            if (err) throw err;
            console.log('Another item was added to the store.');
        })
        start();
    });
}

start();


