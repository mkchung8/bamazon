var inquirer = require("inquirer");
var mysql = require("mysql");
var cartArr = [];
var totalArr = [];
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
    startScreen();
})

function startScreen() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "doWhat",
                message: "Welcome to Bamazon Customer Interface. What would you like to do?",
                choices: ["View Items For Sale", "Search For Item", "Contact Us", "Exit"]
            }
        ])
        .then(function (answer) {

            switch (answer.doWhat) {
                case 'View Items For Sale':
                    viewAllItems();
                    break;
                case 'Search For Item':
                    searchItems();
                    break;
                case "Contact Us":
                    contactUs();
                    break;
                case "Exit":
                    connection.end();
                    break;
            }

        });

};


function viewAllItems() {
    let query = "SELECT * FROM products";
    connection.query(query, function (error, results) {
        if (error) throw error;
        for (var i = 0; i < results.length; i++) {
            console.log(`

            Item: ${results[i].product_name}
            Category: ${results[i].department_name}
            Price: $${results[i].price}
            ID Number: ${results[i].item_id}
            `);
        }
        searchItems();
    })

};

function searchItems() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "itemId",
                message: "Enter the ID number of the item you wish to purchase.",
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
                message: "Enter the number of items to purchase.",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (input) {
            let query = "SELECT item_id, product_name, stock_quantity FROM products WHERE ?";
            let post = { item_id: input.itemId };
            connection.query(query, post, function (error, results) {
                if (error) throw error;

                if (results[0].stock_quantity === 0) {
                    console.log("Sorry, out of stock!");
                    searchItems();
                }

                if (input.quantity > results[0].stock_quantity) {
                    console.log("Insufficient Quantity!");
                    searchItems();
                } else {
                    addToCart(input.itemId, results[0].product_name, input.quantity);
                    inquirer
                        .prompt([
                            {
                                type: "list",
                                name: "action",
                                message: "What would you like to do?",
                                choices: ["Add Another Item", "View Items For Sale", "Checkout", "Exit"]
                            }
                        ])
                        .then(function (response) {
                            switch (response.action) {
                                case 'Add Another Item':
                                    searchItems();
                                    break;
                                case 'View Items For Sale':
                                    viewAllItems();
                                    break;
                                case 'Checkout':
                                    checkOut();
                                    break;
                                case 'Exit':
                                    connection.end();
                                    break;
                            }
                        });
                };


            });
        });


};

function addToCart(id, name, quantity) {
    var checkoutObj = { idItem: id, quantityItem: quantity };
    cartArr.push(checkoutObj)
    console.log(`${name} added to your cart!`);
    console.log(cartArr);
};

function checkOut() {
    console.log("checkOut Function Execute");

    for (var i = 0; i < cartArr.length; i++) {
        let query = "UPDATE products SET ? WHERE ?";
        let properties = [
            {
                
            },
            {

            }
        ];
        connection.query(query, properties, function(error){
            if (error) throw error; 
            
        });
    }

};

function contactUs() {
    console.log(`
    Here is our Contact Information
    Email: bamazon@bamazon.com
    Phone Number: 1-800-BAMAZON
    Website: www.bamazon.com 
    `)
};
