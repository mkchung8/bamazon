var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mkchung8",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) {
        console.error(err);
    }
    console.log("Welcome to the Bamazon Manager Interface");
    setTimeout(startScreen, 2000);
});

function startScreen() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "nav",
                message: "Select Option From Menu.",
                choices: ["View Product Sales By Department", "Create New Department", "Exit"]
            }
        ])
        .then(function (response) {
            switch (response.nav) {
                case 'View Product Sales By Department':
                    viewProductSales();
                    break;
                case 'Create New Department':
                    newDepartment();
                    break;
                case 'Exit':
                    connection.end();
                    break;
            };
        })
};

function viewProductSales() {
    console.log("View Product Sales Function"); 
    startScreen(); 
}; 

function newDepartment() {
    console.log("Create New Department Function");
    startScreen(); 
};
