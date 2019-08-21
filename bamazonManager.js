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



