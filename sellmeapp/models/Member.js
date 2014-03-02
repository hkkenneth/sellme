var mongoose = require('mongoose');
var salesSchema = new mongoose.Schema({
  name: { type: String, required: true }
  , phone: { type: String, required: true }
  , email: { type: String, required: true }  // Free, Tour, Cruise
  , companyName: { type: String, required: true }
  , reportCount: { type: Number, required: true }
  , likeCount: { type: Number, required: true }
});

exports.MemberSchema = new mongoose.Schema({
  userid: { type: String, required: true }
  , password: { type: String, required: true }
  , displayname: { type: String, required: true }  // Mr. Chan etc.
  , usertype: { type: String, required: true }  // sales / customer
  , postdate: { type: String, required: true }  // join date
  , salesinfo: [salesSchema]
});