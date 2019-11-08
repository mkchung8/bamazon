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
                message: "Select option from menu.",
                choices: ["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
            }
        ])
        .then(function (response) {
            switch (response.nav) {
                case 'View Products For Sale':
                    viewProducts();
                    break;
                case 'View Low Inventory':
                    viewLowInventory();
                    break;
                case 'Add to Inventory':
                    addInventory();
                    break;
                case 'Add New Product':
                    addNewProduct();
                    break;
                case 'Exit':
                    connection.end();
                    break;
            }
        })
};

function viewProducts() {
    connection.query("SELECT * FROM products", function (error, data) {
        if (error) throw error;
        for (var i = 0; i < data.length; i++) {
            console.log(`
            Product Name: ${data[i].product_name}
            Product ID: ${data[i].item_id}
            Department: ${data[i].department_name}
            Price: ${data[i].price}
            Quantity: ${data[i].stock_quantity}
            `);
        };
        startScreen()
    });
};

function viewLowInventory() {
    connection.query("SELECT * FROM products", function (error, data) {
        if (error) throw (error);
        for (var i = 0; i < data.length; i++) {
            if (data[i].stock_quantity <= 5) {
                console.log(`
                Product Name: ${data[i].product_name}
                Product ID: ${data[i].item_id}
                Department: ${data[i].department_name}
                Price: ${data[i].price}
                Quantity: ${data[i].stock_quantity}
                `);
            }

        };
        startScreen();
    })

};

function addInventory() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "itemId",
                message: "Enter the ID of the item you wish to add."
            },
            {
                type: "input",
                name: "itemQuantity",
                message: "Enter the quantity of this item you are adding."
            }
        ])
        .then(function (input) {
            let qt = parseInt(input.itemQuantity);
            console.log(qt)
            let id = parseInt(input.itemId);
            let mysqlQuery = `UPDATE products SET stock_quantity = stock_quantity + ${qt} WHERE item_id = ${id}`
            connection.query(mysqlQuery, function (error, response) {
                if (error) throw error;
                
                if (response.changedRows === 0) {
                    console.log(`
                    Sorry, the item ID you entered does not exist in the inventory. Try again.
                    `); 
                    addInventory();
                } else {
                    console.log(`
                    Inventory Successfully Updated!!!
                    `);
                    startScreen();
                }

            })
        });
};

function addNewProduct() {

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the name of New Product"
        },
        {
            type: "input",
            name: "dept",
            message: "Enter the department of New Product"
        },
        {
            type: "input",
            name: "id",
            message: "Enter the ID number of New Product"
        },
        {
            type: "input",
            name: "price",
            message: "Enter the price of New Product"
        },
        {
            type: "input",
            name: "amount",
            message: "Enter the quantity of New Product"
        }
    ]).then(function (input) {
        let idInput = parseInt(input.id);
        let priceInput = parseFloat(input.price);
        let quantityInput = parseInt(input.amount);
        let mysqlQuery = `INSERT INTO products SET ?`;
        let mysqlObj = {
            item_id: idInput,
            product_name: input.name,
            department_name: input.dept,
            price: priceInput,
            stock_quantity: quantityInput
        }
        connection.query(mysqlQuery, mysqlObj, function (error, res) {
            if (error) throw error;
            console.log(`New Product Successfully Added!`);
            startScreen();
        })

    });
};