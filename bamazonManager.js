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

connection.connect(function (err) {
    if (err) throw err;
});

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
        var pick = function (caseData, functionData) {
            switch (caseData) {
                case "View Products for Sale":
                    // getProdcuts(functionData);
                    viewProducts(functionData);
                    console.log('');
                    break;
                case "View Low Inventory":
                    // lowInventory(functionData);
                    lowInventory(functionData);
                    console.log('')
                    break;
                case "Add to Inventory":
                    // addToInventory(functionData);
                    addToInventory(functionData);
                    console.log('');
                    break;
                case "Add New Product":
                    // addNewProduct(functionData);
                    addNewProduct(functionData);
                    console.log('');
                    break;
                default:
                    console.log("Please make a selection");
            }
        };
    })



