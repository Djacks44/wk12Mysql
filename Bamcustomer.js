var mysql = require('mysql');
var prompt = require('prompt');
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
prompt.get(['loginName','zipcode'], function (err, result) {
	var loginName1 = result.loginName;
	var zipcode1 = result.zipcode;
	if (err) throw err;
	//my fuction to show stock
	connection.query("SELECT * FROM Products", function(err, rows) {
		//error callback
		if (err) throw err;
		//opening message
		//space
		console.log("\r");
		console.log("Hello Please take a look at our Catalog:");
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
				console.log("-------------------------------------------------------------------------------------------------" + "\n");
				}
			}
			console.log("                                           End Listing                                                " + "\n");
		//prompt to get item name add stock
		prompt.get(['ProductName', 'Quantity'], function (err, result) {
			if (err) throw err;
			var stuff = [];
			var stuff1 = [];
			//keeps track of unused goods

			for(var a=0;a<rows.length;a++){
				//total for purchased goods
				var cost = parseInt(result.Quantity*rows[a].Price);
				//pushes goods into an array
				stuff.push(rows[a].ProductName);
				stuff1.push(rows[a].ProductName);

				//grabs item the person chose
				if (result.ProductName == rows[a].ProductName){
					//inArray gets index of used good
					var inArray = rows[a].ProductName.indexOf(stuff);
					//and delets it from unused goods
					stuff.splice(inArray, 1);
			
					//makes sure its an eligible quality, if not cancels order, if so gives total due
					if (result.Quantity <= rows[a].StockQuantity){
						console.log("\r");
						console.log("your order of "+result.Quantity+" "+rows[a].ProductName+" is being processed");
						var prod = rows[a].ProductName;
						var obj = rows[a];
						console.log("\r");
						console.log(".......Complete.");
						console.log("\r");
						console.log("Your Total is: $" + cost);
						console.log("\n");

						//logs customer info in to database
						connection.query("SELECT * FROM Customers", function(err, res) {
							// console.log(obj.Price * result.Quantity)
							var orderInfo = {Name: loginName1, Zipcode: zipcode1, Request: prod, Amount: parseInt(result.Quantity), TotalCost:(obj.Price * result.Quantity)};
											    // console.log("\n");
											    // console.log(orderInfo);
								var query = connection.query('INSERT INTO Customers SET ? ', orderInfo, function(err, result) {
								      			if(err){
								        		console.log("Problem, check spelling", err);
								        		}

								});
						});
							//updates mysql database
						connection.query("UPDATE Products SET StockQuantity = ? Where ProductName = ?", [(parseInt(rows[a].StockQuantity) - parseInt(result.Quantity)), result.ProductName], function (err, result) {
								connection.end();
						});

					}else{
							console.log("Insufficient quantity");
							connection.end();
					}
				}
			};
			//if stuff.lenght is more than 9 then no order has been placed due to error
			if (stuff.length===stuff1.length) {
				console.log("Input Error, Undefined Product Name");
				// console.log(stuff.length)
				connection.end();
			};
		});
	});
});
