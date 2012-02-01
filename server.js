
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , request = require('request')
  ;

var app = module.exports = express.createServer();

// Configuration

app.configure('all', function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Settings

app.settings2 = {
  useProxy: false,
  proxy: 'http://localhost:8888',
  quotesUrlTemplate: 'http://download.finance.yahoo.com/d/quotes.csv?s={tickers}&f=spjkvm4nyrr1dt8e'
};

request.defaults({
  proxy: app.settings2.useProxy ? proxy : null
});

app.get('/', function (req, res) { 
  res.redirect('/stockwatcher.html');
});

app.get('/stocks/:tickers', function(req, res) {
  var url = app.settings2.quotesUrlTemplate.replace('{tickers}', req.params.tickers);
  console.log('Quotes request: ', url);
  request(url).pipe(res);
});

app.listen(process.env.PORT || 3000);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);