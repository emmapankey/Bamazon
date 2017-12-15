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

                case "Search for all artists who appear more than once":
                    searchDuplicateArtists();
                    break;

                case "Search for songs from between a specific range":
                    searchFromRange();
                    break;

                case "Search for a specific range":
                    songSearch();
                    break;

                case "Search for a specific song":
                    searchSpecificSong();
                    break;
            }
        })
}

// function which queries and displays all of the current product information in the database
function viewProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item id: " + res[i].item_id + "\nProduct Name: " + res[i].product_name +
                "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\nQuantity in Stock: " + res[i].stock_quantity + "\n\n");
        }
    });
}