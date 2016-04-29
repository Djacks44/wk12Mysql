var mysql = require('mysql');
//connecting to mydatabase in sql
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Bamazon'
});

//showing an error if there is a connection problem
connection.connect(function(err) {

  if (err) {
    console.error('error connecting: ' + err);
    return;
  }
});


connection.query('SELECT * from Managers', function(err, rows) {
	if (err) throw err;
  	console.log("\n");
  	console.log("Manager Login Data:")
  	console.log("\r")
	for(var i=0; i<rows.length; i++){

		console.log(("Name: " + rows[i].name) + " || Login Date and Time " + rows[i].loginDateTime);
		console.log("-------------------------------------------------------------------------------------------------" + "\r");
				
	}
	console.log("\n");
  	console.log("Customer Orders:")
  	console.log("\r")
});


connection.query('SELECT * from Customers', function(err, rows) {
	if (err) throw err;
	totalArry=[];
	for(var a=0; a<rows.length; a++){
  	
	  	totalArry.push(rows[a].TotalCost)
	  	
	  	// var totalrev = rows[a].TotalCost
				
		console.log(("Name: " + rows[a].Name) + " || Zipcode: " + rows[a].Zipcode +" || Order: " + rows[a].Request + " || Orderd Amount: " + rows[a].Amount +" || Total Cost: $" + rows[a].TotalCost);
		console.log("-------------------------------------------------------------------------------------------------" + "\r");

	};

	var totalrev = totalArry.reduce(function(previousValue, currentValue, currentIndex, array) {
	  		return previousValue + currentValue;
		});
	console.log("\n");
	console.log("Total Revenue $"+totalrev+".00")
	console.log("-------------------------------------------------------------------------------------------------" + "\n");
});
 
connection.end();