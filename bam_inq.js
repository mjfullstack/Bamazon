// Load the NPM Package inquirer
var inquirer = require("inquirer"); // This is an internal developer use case for getting info form terminal 
var mysql = require("mysql");
var config = require('./config.js'); // MY password for my connection to MySQL
// var bamSql = require("./bam_sql.js");

console.log('BAM_INQ.JS is loaded');

var methods = {};

methods.CreateConn = function() {
  connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: config.password,
    database: "bamazon_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
  });
};

methods.closeConn = function() {
  connection.end();
  console.log("Database connection closed!");
};


// Determine if user is new registeration or existing login
methods.registerOrLogin = function() {
  // Create a LIST with a series of options.
  inquirer
    .prompt([
    {
      type: "list",
      message: "Register or Login: ",
      name: "registerLogin",
      choices: ["REGISTER", "LOGIN", "EXIT"]
    }
  ])
  .catch(function(error) {
    console.log(error);
  })
  .then(answer1 => {
    console.log("answer1 = ", answer1);
    console.log("answer1.registerLogin = " + answer1.registerLogin);

    switch(answer1.registerLogin) {
      case "REGISTER" : methods.getUserInfo(answer1.registerLogin);
        break;
      case "LOGIN" : methods.getUserInfo(answer1.registerLogin);
        break;
      default : console.log("Exiting...");
      // methods.closeConn
        // break;
      }
  });
};

// Whether new or existing user, get credentials...
var username;
var password;
methods.getUserInfo = function(action) {
  if (action === "REGISTER") {
    console.log("Registering New User...");
  } else {
    console.log("Enter Login Credentials...");
  }
  // Create a "Prompt" with a series of questions.
  inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "input",
        message: "Enter username",
        name: "user",
      },
      // Here we create a basic password-protected text prompt.
      {
        type: "password",
        message: "Enter password: ",
        name: "password"
      }
    ])
    .catch(function(error) {
      console.log(error);
    })
    .then(answer2 => {
      console.log("answer2 = ", answer2);
      console.log("answer2.user = " + answer2.user);
      console.log("answer2.password = " + answer2.password);
      username = answer2.user;
      password = answer2.password;
      if (action === "REGISTER") {
        inquirer
          .prompt([
            {
              type: "password",
              message: "Confirm password: ",
              name: "password2"
            }
          ])
          .catch(function(error) {
            console.log(error);
          })
          .then (answer3 => {
            console.log("answer3 = ", answer3);
            console.log("answer3.password2 = " + answer3.password2);
            if (password === answer3.password2) {
              console.log("Registration Complete, Passwords match. Account Created");
              console.log("Username: "+ username);
              console.log("Password: " + password);
            } else {
              password = null;
              console.log("Registration FAILED. Passwords don't match.");
              // Must RETRY...
              return
            }
          })
        } else {
          console.log("Welcome Back, " + username + "!")
          // methods.readItems( searchType, answer.searchTerm);
          methods.readItems( null, null);
        }
      });
    };

  // c-R-ud: READ
  methods.readItems = function(searchType, searchTerm) {
    // console.log("Selecting " + searchType + "s containing... " + searchTerm + "\n");
      var myQuery = connection.query(
      // "SELECT * FROM bamazon_db.products WHERE " + searchType + " LIKE ?", // WORKS
      // "%" + searchTerm + "%",
      "SELECT * FROM bamazon_db.products", // WHERE " + searchType + " LIKE ?", // WORKS
      // "%" + searchTerm + "%",
      function(err, res) {
        if (err) {
          console.log(err);
          throw err;
        };
        // logs the actual query being run
        // console.log(myQuery.sql);
        // Log all results of the SELECT statement
        // console.log(res);
        console.log("Item ID\t" + "Description\t\t\t\t\t" + "Category\t\t" + "Price\t\t" + "Qty In Stock");
        res.map(function (item, index) {
          console.log(item.item_id + "\t" + item.product_name + "\t\t" + item.department_name + "\t", item.retail_price + "\t" + item.stock_quantity);
          // INSERT INTO products (product_name, department_name, retail_price, stock_quantity)
        });
        // console.log("Enter Item ID to Add to Cart...");
        // Use inquirer to get item to purchase and quantity
        methods.getItemQty();
      });
    }
  
  
// c-R-ud: READ
methods.getItemQty = function() {
  console.log("getItemQty...");
  // Use inquirer to get item to purchase and quantity
  // Create a "Prompt" with a series of questions.
  inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "input",
        message: "Enter Item ID to Add to Cart...",
        name: "itemToBuy",
      },
      // Here we create a basic password-protected text prompt.
      {
        type: "input",
        message: "Enter Quantity: ",
        name: "qtyToBuy"
      }
    ])
    .catch(function(error) {
      console.log(error);
    })
    .then(answer => {
      console.log("answer.itemToBuy: ", answer.itemToBuy, "answer.qtyToBuy: ", answer.qtyToBuy);
      var itemToBuy = eval(answer.itemToBuy);
      var qtyToBuy = eval(answer.qtyToBuy);
      console.log("itemToBuy: ", itemToBuy, "qtyToBuy: ", qtyToBuy);
      if ( !itemToBuy || !qtyToBuy) {
        console.log("Must enter ITEM and QTY...")
        methods.getItemQty();
      } else {
        var myQuery = connection.query(
          "SELECT * FROM bamazon_db.products WHERE ?", // WORKS
          // "SELECT * FROM bamazon_db.products", // WHERE " + searchType + " LIKE ?", // WORKS
          [
            {
              item_id : itemToBuy
            }
          ],
        function(err, res) {
          if (err) {
            console.log(err);
            throw err;
          };
          // logs the actual query being run
          // console.log(myQuery);
          // Log all results of the SELECT statement
          // console.log(res);
          console.log("res.item_id: ", res[0].item_id);
          console.log("res.stock_quantity: ", res[0].stock_quantity);
          console.log("Price Each: ", res[0].retail_price, "Quantity: ", qtyToBuy, "Total Cost: ", res[0].retail_price * qtyToBuy);
          var totalCost = res[0].retail_price * qtyToBuy;
          console.log("Total Cost: ", totalCost);
          // Subtract QTY from the In-Stock Balance
          var qtyLeft = res[0].stock_quantity - answer.qtyToBuy
          console.log("qtyLeft: " + qtyLeft);
          methods.updateItemQty(itemToBuy, qtyLeft);
          // methods.closeConn();
          // return [itemToBuy, qtyToBuy];
        })
      }
    })
  }

// cr-U-d Update
// Subtract QTY from the In-Stock Balance
methods.updateItemQty = function(itemId, qtyRemaining) {
  var myQuery = connection.query(
    "UPDATE bamazon_db.products SET ? WHERE ?", // "? here means being passed in immediately below"
    [
      {
        stock_quantity: qtyRemaining
      },
      {
        item_id: itemId
      }
    ],
    function(err, res) {
      if (err) {
        console.log(err);
        throw err;
      };
      // logs the actual query being run
      // console.log("myQuery1...");
      // console.log(myQuery);
      // Log all results of the SELECT statement
      // console.log("Rows Affected:\t", res[0].OkPacket.changedRows);
      // console.log("Database Message:\t", res[0].OkPacket.message);
      // console.log("\n\nres...")
      // console.log(res)
      // Create QUERY that retrieves the updated data for JUST THIS ITEM.
      var myQuery2 = connection.query(
        "SELECT * FROM bamazon_db.products WHERE ?", // "?" here means being passed in immediately below, // WORKS
        [
          {
            item_id: itemId
          }
        ],
        function(err, res2) {
          if (err) {
            console.log(err);
            throw err;
          };
          // console.log("myQuery2...");
          // console.log(myQuery2);
          // console.log("res2[0].item_id: ", res2[0].item_id, "stock_quantity: ", res2[0].stock_quantity);
          methods.readItems();
      })
  })
}








module.exports = methods