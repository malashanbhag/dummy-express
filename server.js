var express = require('express');
var app = express();
let faker = require('faker');
let cors = require('cors');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'),cors());

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
});

app.get('/user', function(req, res) {
	var data = ({
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		username: faker.internet.userName(),
		email: faker.internet.email()
	});
	res.status(200).send(data);
});

app.get('/users/:num', function(req, res) {
   var users = [];
   var num = req.params.num;

   if (isFinite(num) && num  > 0 ) {
     for (i = 0; i <= num-1; i++) {
       users.push({
           firstName: faker.name.firstName(),
           lastName: faker.name.lastName(),
           username: faker.internet.userName(),
           email: faker.internet.email()
        });
     }

     res.status(200).send(users);
    
   } else {
     res.status(400).send({ message: 'invalid number supplied' });
   }
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});