# Bamazon CLI App
Backend of an Online Retailer via Inquirer

## Pulldown Instructions

* Clone Git Repo: https://github.com/mjfullstack/Bamazon
* Edit configEDIT.js to use your own MySQL connection password
* Save this as config.js
* Execute npm install
* bamazon.sql is the database schema. Run it in MySQL to create the database

## Program Execution

### Initial "REGISTER" and "LOGIN" Procedure

* To run the program, enter "node bamazon.js" in a terminal window
* Once inside, select REGISTER to create your account
  * Enter any name and any password 
  * Enter the SAME password at the password confirmation prompt
    * If the two passwords match, access to the program as a customer is granted
    * The program exits if the passwords don't match
    * This is the extent of the registration validation
      * A simplified user database is yet to be added
  * Alternatively, select LOGIN and enter any name and any password
    * As noteded above, the only checking is the simple registeration validation
    * As such, a empty username and password is currently accepted for easy debug
  * One can also cleanly EXIT the program if desired

### Select Item ID and QTY

* Once past REGISTER / LOGIN, the list of items is presented
* Select and Item ID and Quantity to purchase
  * Alternatively, entering "x" for both these prompts will cleanly EXIT the program
  * Input validation ensures the two entries are numeric
  * A check is performed to ensure the item ID is less than the max items available

## Video Demo

* Link to Demo: https://drive.google.com/open?id=1Sg8JsbHW-C1lGXKOPLQCFcJiJHAyp73u