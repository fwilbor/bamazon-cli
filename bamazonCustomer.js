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
});
function start() {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            // console.log(res)

            console.log('_.~"~._.~"~._.~Welcome to BAMazon~._.~"~._.~"~._')
            console.log('----------------------------------------------------------------------------------------------------')

            for (var i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
                console.log('--------------------------------------------------------------------------------------------------')
            }

            console.log(' ');
            inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: "What is the ID of the product you would like to buy?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;

                    }
                },
                {
                    type: "input",
                    name: "quantity",
                    message: "How many units of the product would you like to buy",
                    validate: function (value) {
                        if (isNaN(value)) {
                            return false;
                        } else {
                            return true;
                        }
                    }

                }

            ]).then(function (ans) {

                var whatToBuy = (ans.id) - 1;
                var howMuchToBuy = parseInt(ans.quantity);
                var grandTotal = parseFloat(((res[whatToBuy].price) * howMuchToBuy).toFixed(2));

                //Check if quantity is sufficient

                if (res[whatToBuy].stock_quantity >= howMuchToBuy) {
                    //after purchase updates quantity in Products Table
                    connection.query("UPDATE products SET ? WHERE ?", [
                        { stock_quantity: (res[whatToBuy].stock_quantity - howMuchToBuy) },
                        { item_id: ans.id }


                    ], function (err, res) {
                        if (err) throw err;
                        console.log("Congratulations! Your Grand Total is $" + grandTotal.toFixed(2) + ". Your item(s) will arrive to you in 3-5 business days. Thank You for shopping with Bamazon");


                    });








                }
            }








            )


        })

    });

}
start();

