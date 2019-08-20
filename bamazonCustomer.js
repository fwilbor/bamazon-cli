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
                }





            ])


        })

    });

}
start();

