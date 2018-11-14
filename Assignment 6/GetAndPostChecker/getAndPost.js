/*********************************************************************************************************
 * Author: Colin Van Overschelde
 * Date: 2/25/2018
 * Description: getAndPost.js creates a server to listen for GET and POST requests at 
 *	 			http://flip3.engr.oregonstate.edu:3149.  When a GET or POST request is sent to this port
 *				the server will process the request and display the query parameters
 *********************************************************************************************************/

// Setup express
var express = require('express');
var app = new express();

// Setup express-handlebars
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Setup POST body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup the port to listen to
app.set('port', 3149);

/********************************************************************************************************
 * Description: Handler to process GET requests sent to the root.  Parses the URL query and displays 
 *				the parameter names and values in tables
 ********************************************************************************************************/
app.get('/', function(req, res){
	var getQuery = [];		// Create array to store query parameters
	for (var i in req.query){	// Loop through each query parameter
		getQuery.push({'key':i, 'value':req.query[i]});		// Add an object to the array containing the parameter
	}

	//var getQuery = parseQuery(req.query);

	var queryObject = {};		// Create object to pass to render
	queryObject.getQuery = getQuery;		// Assign the parameter array to the object
	res.render('get-received', queryObject);		// Render the handlebars
});

/********************************************************************************************************
 * Description: Handler to process POST requests sent to the root.  Parses both the URL query and the body
 *				query and displays the parameter names and values in tables
 ********************************************************************************************************/
app.post('/', function(req, res){
	// Parse URL query to an array
	var urlQuery = [];		// Create array to store query parameters
	for (var i in req.query){	// Loop through each query parameter
		urlQuery.push({'key':i, 'value':req.query[i]});		// Add an object to the array containing the parameter
	}

	// Parse the Body query to an array
	var bodyQuery = [];
	for (var i in req.body){		// Loop through each element of the body
		bodyQuery.push({'key':i, 'value':req.body[i]});		// Andd its contents bodyQuery
	}

	// Create object to pass to post-received.handlebars
	var postContent = {};
	postContent.urlQuery = urlQuery;
	postContent.bodyQuery = bodyQuery;

	// Display post-received.handlebars
	res.render('post-received', postContent);
});

/********************************************************************************************************
 * Description: Handler to process any unmanaged requests by displaying a '404 - Page Not Found' page
 ********************************************************************************************************/
app.use(function(req, res){
	res.render('404');
});

/********************************************************************************************************
 * Description: Handler to process any unmanaged requests that cause a server error by displaying
 *				a '500 - Server Error' page
 ********************************************************************************************************/
app.use(function(err, req, res, next){
  res.render('500');
});

/********************************************************************************************************
 * Description: Starts a server listening on the port specified
 ********************************************************************************************************/
app.listen(app.get('port'), function(){
  console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});