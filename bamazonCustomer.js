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

// // function which prompts the user for purchasing a product
function placeOrder() {
  var chosen;
  var orderQuantity;

  inquirer.prompt([
    {
      name: "productid",
      type: "input",
      message: "Enter the product id: "
    },
    {
      name: "units",
      type: "input",
      message: "How many units of this product do you wish to purchase?"
    }
  ]).then(function (answer) {
    var orderQuantity = parseInt(answer.units);
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;
      // get the product information for the chosen product id
      for (var i = 0; i < res.length; i++) {

        if (res[i].item_id === parseInt(answer.productid)) {
          chosen = res[i];
    
          // console.log(chosen);

          // if the stock quantity of an ordered item is less than the number of units ordered notify user
          if (chosen.stock_quantity < orderQuantity) {
            console.log("\nInsufficeint quantity in stock! Your order cannot be completed.\n");
            continueShopping();
          }

          // if there is sufficient stock to fullfil an order complete the order and update the database
          else if (chosen.stock_quantity >= orderQuantity) {
            var newStockQuantity = chosen.stock_quantity - orderQuantity;

            connection.query(
              "UPDATE products SET stock_quantity = " + newStockQuantity + " WHERE item_id = " + answer.productid,
              function(error) {
                if (error) throw err;
                console.log("\nYour order is being processed.\n" +
                "Your total purchase cost is " + "$" + round(chosen.price * (orderQuantity), 2) + "\n");
                continueShopping();
              }
            );
          }
        }
      }
    })
  });

}

function round(value, exp) {
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);

  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}

function continueShopping() {
  inquirer.prompt(
    {
      name: "continueShopping",
      type: "input",
      message: "Would you like to continue shopping? [yes] or [no]",
      choices: ["yes", "no"]
    }
  ).then(function (answer) {
    if (answer.continueShopping.toLowerCase() === "yes") {
      start();
    }
    else if (answer.continueShopping.toLowerCase() === "no") {
      console.log("\nThank you for shopping\n");
      return;
    }
  })
}
