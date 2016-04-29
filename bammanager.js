var mysql = require('mysql');
var prompt = require('prompt');
//connecting to mydatabase in sql
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Bamazon'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err);
    return;
  }
});

prompt.get(['loginName'], function (err, result) {
		if (err) throw err;

	console.log("\n");
	console.log("Welcome "+result.loginName);
	console.log("\r");
	console.log("Menu options:");
	console.log("\r");
	console.log("1) View Products for Sale");
	console.log("\r");
	console.log("2) View Low Inventory");
	console.log("\r");
	console.log("3) Add to Inventory");
	console.log("\r");
	console.log("4) Add New Product");
	console.log("\n");

	prompt.get(['optionsNumber'], function (err, result) {
		if (err) throw err;

		switch (parseInt(result.optionsNumber)) {

	  		case 1:
	    		connection.query("SELECT * FROM Products", function(err, rows) {
					//error callback
					if (err) throw err;
					//opening message
					//space
					console.log("\r");
					console.log("Listed Products:");
					//space
					console.log("\n");
					//displays everything with spacing and sperations
						for(var i=0; i<rows.length; i++){
							// num 10 not space properly double digit, need their own spacing
							if (rows[i].ItemID < 10) {
							console.log(("ItemId: " + rows[i].ItemID) + "  || " + rows[i].ProductName + " || $" + rows[i].Price.toFixed(2) + " || " + rows[i].StockQuantity+" Left in Stock");
							console.log("-------------------------------------------------------------------------------------------------" + "\n");
							}else if (rows[i].ItemID >= 10) {
							console.log(("ItemId: " + rows[i].ItemID) + " || " + rows[i].ProductName + " || $" + rows[i].Price.toFixed(2) + " || " + rows[i].StockQuantity+" Left in Stock");
							console.log("----------------------------------------- End Listing -------------------------------------------" + "\n");
							}
						}
						connection.end();
						});
	    		break;

	    	case 2:
	    		connection.query("SELECT * FROM Products", function(err, rows) {
					if (err) throw err;
					console.log("\r");
					console.log("Listed Products:");
					console.log("\n");
						for(var i=0; i<rows.length; i++){
							// num 10 not space properly double digit, need their own spacing
							if (rows[i].StockQuantity < 5) {
							console.log(("ItemId: " + rows[i].ItemID) + "  || " + rows[i].ProductName + " || $" + rows[i].Price.toFixed(2) + " || " + rows[i].StockQuantity+" Left in Stock");
							console.log("-------------------------------------------------------------------------------------------------" + "\n");

							}
						}
						console.log("                                           End Listing                                                " + "\n");
						connection.end();
						});	
	    		break;

	    	case 3:

	prompt.get(['ItemID', 'addQuantity'], function (err, result) {
		connection.query("SELECT * FROM Products", function(err, rows) {
			if (err) throw err;
			for(var i=0; i<rows.length; i++){
				if (result.ItemID == rows[i].ItemID) {
				var addQuant = parseInt(rows[i].StockQuantity) + parseInt(result.addQuantity)
				console.log( rows[i].ProductName+" || Quantity: "+addQuant)
				console.log("\n");

			connection.query("UPDATE Products SET StockQuantity = ? Where ItemID = ?", [addQuant, result.ItemID], function (err, result) {
				if (err) throw err;
				connection.end();
			});
				}
			};
		
		});
	});	
	    		break;
	    	case 4:
	    		console.log('yoooo')
	    		break;
		}
	});
});
















