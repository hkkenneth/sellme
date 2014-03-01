
/**
 * Module dependencies.
 */

var express = require('express');
// Routes are kind of like a combination of models and controllers in this setup – they direct traffic and also contain some programming logic
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

// DB code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/tempsellme');

// nstantiates Express and assigns our app variable to it. 
var app = express();

// all environments
//app.set('port', process.env.PORT || 3000);
app.set('port', process.env.PORT || 8080);

// where are the views
app.set('views', path.join(__dirname, 'views'));

// what engine to use to render those views
app.set('view engine', 'jade');


app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);

// serve static objects from the /public/ dir, but to make them actually seem like they're coming from the top level
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/hello', routes.hello);
app.get('/users', user.list);

// DB test read
app.get('/userlist', routes.userlist(db));
// DB test write
app.get('/newuser', routes.newuser);
app.post('/adduser', routes.adduser(db));

// Polls Demo
app.get('/polls/polls', routes.list);
app.get('/polls/:id', routes.poll);
app.post('/polls', routes.create);

// These are for APIs, not really related to Angular JS
// Sell Me code
// Looks like the author purposely made the 2 endpoints sharing the same prefix...
// Also see public/javascripts/services.js
app.get('/cases/list', routes.listCases);
app.get('/cases/:id', routes.listCase);
app.post('/cases', routes.createCase);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
