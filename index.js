require('newrelic');

var express = require('express');
var app = express();

app.get('/registry', function(req, res){
  res.redirect('http://www.myregistry.com/Visitors/GiftList.aspx?sid=75EAA302-43AF-4E3A-B6F0-4D8395AC9F23');
});

// New call to compress content
app.use(express.compress());

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);
