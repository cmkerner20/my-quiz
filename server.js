var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', function (req, res) {
	app.use(express.static(path.join(__dirname, '/public')));
  res.sendFile(path.join(__dirname + '/public/index.html'));

});

/*app.get('/quiz', function (req, res) {
  app.use(express.static(path.join(__dirname, '/public')));
  console.log("swag");
  res.sendFile(path.join(__dirname + '/public/index.html'));

});

app.get('/quiz', function (req, res) {
  var content = fs.readFileSync("javascript/quiz.json", 'utf8');
  res.send(content);
});*/
app.get('/quiz', function (req, res, next) {
   console.log('get recieved');
  var content = fs.readFileSync("data/quiz.json", 'utf8');
  res.send(content);
 
  });
  /*var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });*/




app.post('/quiz', function(req, res) {
  console.log(req.body); 
  var finishedQuiz = JSON.stringify(req.body);
  fs.writeFile("data/quiz.json", finishedQuiz);
      // your JSON
  /*res.contentType('json');
  res.send({ quiz: JSON.stringify({response:'json'}) });
  app.use(express.static(path.join(__dirname, '/public')));
*/
});


/*var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});*/
app.listen(4000);