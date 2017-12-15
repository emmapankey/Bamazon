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
    managerPrompt();
});

// initial prompt to ask maanager to choose from a range of options
function managerPrompt() {
    inquirer.prompt(
        {
            name: "manager",
            type: "rawlist",
            message: "\nPlease select an option: ",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }).then(function (answer) {
            switch (answer.manager) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    viewLowInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;
            }
        })
}

// function which queries and displays all of the current product information in the database
function viewProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {

        console.log("\nEXISTING PRODUCT INVENTORY:\n")

        for (var i = 0; i < res.length; i++) {
            console.log("Item id: " + res[i].item_id + "\nProduct Name: " + res[i].product_name +
                "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\nQuantity in Stock: " + res[i].stock_quantity + "\n\n");
        }
        managerPrompt();
    });
}

// function which queries and displays all products with a current inventory count lower than five
function viewLowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 100"
    connection.query(query, function (err, res) {

        console.log("\nLOW INVENTORY:\n")

        for (var i = 0; i < res.length; i++) {
            console.log("Item id: " + res[i].item_id + "\nProduct Name: " + res[i].product_name +
                "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\nQuantity in Stock: " + res[i].stock_quantity + "\n\n");
        }
        managerPrompt();
    });
}

// funciton which allows the manager to add more stock to a current store item
function addInventory() {

}

// function which allows the manager to add a new product to the store
function addNewProduct() {
     // prompt for info about the product being added
  inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Input the product name"
    },
    {
      name: "department",
      type: "input",
      message: "Input the product's department"
    },
    {
      name: "price",
      type: "input",
      message: "Input the price per unit item"
    },
    {
    name: "stock",
    type: "input",
    message: "Input the current stock quantity",
    validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ])
  .then(function(answer) {
    // when finished prompting, insert the new product into the db with that info
    connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: answer.name,
        department_name: answer.department,
        price: answer.price,
        stock_quantity: answer.stock
      },
      function(err) {
        if (err) throw err;

        console.log("\nTHIS PRODUCT WAS SUCCESSFULLY ADDED\n");

        managerPrompt();
      }
    );
  });
}