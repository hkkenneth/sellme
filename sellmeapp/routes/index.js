
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Pick a category to get started' });
};

// running a wrapper function to which we pass our db variable, and then doing a page render just like the other two "exports" in this route file. 
exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
    };
};

// db write test (get)
exports.newuser = function(req, res){
  res.render('newuser', { title: 'Add New User' });
};

// post action
exports.adduser = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var userEmail = req.body.useremail;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "username" : userName,
            "email" : userEmail
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("userlist");
                // And forward to success page
                res.redirect("userlist");
            }
        });

    }
}

// Mau's static
exports.homepage = function(req, res){
  res.render('homepage', { title: 'Sell Me!' });
};
exports.cases = function(req, res){
  res.render('cases', { title: 'Sell Me!' });
};

var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'tempsellme');

// Sell Me code
var CaseSchema = require('../models/Case.js').CaseSchema;
// The first param is the collection name
var Case = db.model('cases', CaseSchema);

// route handlers
// JSON API for list of cases
exports.listCases = function(req, res) {
  Case.find({}, {}, function(error, caseItems) {
    res.json(caseItems);
  });
};

// JSON API for getting a single case
exports.listCase = function(req, res) {
  var caseId = req.params.id;
  Case.findById(caseId, '', { lean: true }, function(err, caseItem) {
    if(caseItem) {
      res.json(caseItem);
    } else {
      res.json({error:true});
    }
  });
};

// JSON API for creating a new case
exports.createCase = function(req, res) {
  var reqBody = req.body
    , caseObj = {
        userid: reqBody.userid
      , casetitle: reqBody.casetitle
      , casetype: reqBody.casetype
      , postdate: 'date'
      , remarks: reqBody.remarks
    };
  console.log(reqBody);
  switch (caseObj.casetype) {
    case 'insurance':
      caseObj.insurancecontent = [reqBody.insurancecontent];
      break;
    case 'mobile':
      caseObj.mobilecontent = [reqBody.mobilecontent];
      break;
    case 'boardband':
      break;
    default:
      break;
  }
  //choices = reqBody.choices.filter(function(v) { return v.text != ''; }),
  var caseItem = new Case(caseObj);
  caseItem.save(function(err, doc) {
    if(err || !doc) {
      res.json({error: true});
    } else {
      res.json(doc);
    }
  });
};

// Polls Demo

var PollSchema = require('../models/Poll.js').PollSchema;
var Poll = db.model('polls', PollSchema);

// route handlers
// JSON API for list of polls
exports.list = function(req, res) {
  Poll.find({}, 'question', function(error, polls) {
    res.json(polls);
  });
};
// JSON API for getting a single poll
exports.poll = function(req, res) {
  var pollId = req.params.id;
  Poll.findById(pollId, '', { lean: true }, function(err, poll) {
    if(poll) {
      var userVoted = false,
          userChoice,
          totalVotes = 0;
      for(c in poll.choices) {
        var choice = poll.choices[c];
        for(v in choice.votes) {
          var vote = choice.votes[v];
          totalVotes++;
          if(vote.ip === (req.header('x-forwarded-for') || req.ip)) {
            userVoted = true;
            userChoice = { _id: choice._id, text: choice.text };
          }
        }
      }
      poll.userVoted = userVoted;
      poll.userChoice = userChoice;
      poll.totalVotes = totalVotes;
      res.json(poll);
    } else {
      res.json({error:true});
    }
  });
};
// JSON API for creating a new poll
exports.create = function(req, res) {
  var reqBody = req.body,
      choices = reqBody.choices.filter(function(v) { return v.text != ''; }),
      pollObj = {question: reqBody.question, choices: choices};
  var poll = new Poll(pollObj);
  poll.save(function(err, doc) {
    if(err || !doc) {
      throw 'Error';
    } else {
      res.json(doc);
    }
  });
};
