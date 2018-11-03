
// Load application fileset
var bamInq = require("./bam_inq.js");
// var bamSql = require("./bam_sql.js");

// Create Database Connection...
bamInq.CreateConn();

// Call First Prompt...
bamInq.registerOrLogin();
// console.log("exit from bamazon level");

