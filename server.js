var express = require('express');
var app = express();
var path = require('path');


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/start.html'));
});

app.get('/quiz', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
  app.use(express.static(path.join(__dirname, './public')));

});

app.post('/quiz', function(req, res) {
  //console.log(req.body.objectData);
  res.contentType('json');
  res.send({ some: JSON.stringify({response:'json'}) });
});


/*var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});*/
app.listen(4000);