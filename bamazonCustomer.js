// require mysql package
var mysql = require("mysql");

// require inquirer package for user prompts
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which displays the product information stored in the database for the user to see in the terminal
function start() {
  console.log("\nToday's Recommended Deals:\n");

  // query the database for product item id's, names, and prices
  var query = "SELECT item_id, product_name, price FROM products";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("Item id: " + res[i].item_id + "\nProduct Name: " + res[i].product_name + "\nPrice: " + res[i].price + "\n\n");
    }
    placeOrder();
  });
}


