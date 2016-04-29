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
	connection.query("SELECT * FROM Managers", function(err, res) {
		var addedName = {name: result.loginName};
						    // console.log("\n");
						    // console.log(addedName);
			var query = connection.query('INSERT INTO Managers SET ? ', addedName, function(err, result) {
			      			if(err){
			        		console.log("Problem, check spelling", err);
			        		}

			});
	});

						
	//space
	console.log("\n");
	console.log("Welcome "+result.loginName);
	//space
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
					console.log("\r");
					console.log("Listed Products:");
					console.log("\n");
					//displays everything with spacing and sperations
						for(var i=0; i<rows.length; i++){
							// num 10 not space properly double digit, need their own spacing
							if (rows[i].ItemID < 10) {
							console.log(("ItemId: " + rows[i].ItemID) + "  || " + rows[i].ProductName + " || $" + rows[i].Price.toFixed(2) + " || " + rows[i].StockQuantity+" Left in Stock");
							console.log("-------------------------------------------------------------------------------------------------" + "\n");
							}else if (rows[i].ItemID >= 10) {
							console.log(("ItemId: " + rows[i].ItemID) + " || " + rows[i].ProductName + " || $" + rows[i].Price.toFixed(2) + " || " + rows[i].StockQuantity+" Left in Stock");
							console.log("-------------------------------------------------------------------------------------------------" + "\n");
							}
						}
						console.log("                                           End Listing                                                " + "\n");
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
	    		//gets product information
				prompt.get(['ItemID', 'addQuantity'], function (err, result) {
					connection.query("SELECT * FROM Products", function(err, rows) {
						if (err) throw err;
						for(var i=0; i<rows.length; i++){
							//when input equals an item it captures it to allow it to be edited
							if (result.ItemID == rows[i].ItemID) {
							//adds new quant to previous quant
							var addQuant = parseInt(rows[i].StockQuantity) + parseInt(result.addQuantity)
							console.log( rows[i].ProductName+" || Quantity: "+addQuant)
							console.log("\n");

						//updates with new quant info
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
			//gets product information
				prompt.get(['ProductName', 'DepartmentName', 'Price', 'StockQuantity'], function (err, result) {
			  		connection.query("SELECT * FROM Products", function(err, res) {
						if (err) throw err;
						//makes return values intergers
						var pNum = parseInt(result.Price);
						var sQNum = parseInt(result.StockQuantity);
						
						var addedProduct = {ProductName: result.ProductName, DepartmentName: result.DepartmentName, Price: pNum, StockQuantity:sQNum };
						    console.log("\n");
						    console.log(addedProduct);

			   			var query = connection.query('INSERT INTO Products SET ? ', addedProduct, function(err, result) {
			      			if(err){
			        		console.log("Problem, check spelling", err);
			        		connection.end();
			      			}else{
			      				console.log("\r");
			      				console.log("Your Product has been added")
			      				console.log("\r");
			      				connection.end();
			      			}

			    		});
			  		});
			  	});

	    		break;
		}
	});
});


