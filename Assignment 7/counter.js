// Setup express
var express = require('express');
var app = express();

// Include express middle-ware
var handlebars = require('express-handlebars').create({default:'main'});
var bodyParser = require('body-parser');
var session = require('express-session');

// Setup handlebars middle-ware
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Setup body-parser middle-ware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Setup session middle-ware
app.use(session({secret: 'some-secret'}));

// Setup the port to listen to
app.set('port', 3149);

app.get('/', function(req, res){
	res.render('home');
});

app.get('/count', function(req, res){
	// Update counter
	var context = {};
	context.count = req.session.count || 0;
	req.session.count = context.count + 1;
	
	// Display counter page
	res.render('counter', context);
});

app.post('/count', function(req, res){
	var context = {};
	
	if(req.body.command === "resetCount"){
		req.session.count = 0;
	}
	else{
		context.err = true;
	}	
	
	context.count = req.session.count || 0;
	req.session.count = context.count + 1;
	res.render('counter', context);
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});