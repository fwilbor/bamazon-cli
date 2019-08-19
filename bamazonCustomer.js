var mysql = require("mysql");

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
        connection.end();
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            console.log(res)

            console.log('_.~"~._.~"~._.~Welcome to BAMazon~._.~"~._.~"~._')
            console.log('----------------------------------------------------------------------------------------------------')

            for (var i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].ItemID + " | " + "Product: " + res[i].ProductName + " | " + "Department: " + res[i].DepartmentName + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].StockQuantity);
                console.log('--------------------------------------------------------------------------------------------------')
            }


        })

    });

}
