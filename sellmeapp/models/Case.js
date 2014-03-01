var mongoose = require('mongoose');
var insuranceSchema = new mongoose.Schema({
  destination: { type: String, required: true }
  , datestr: { type: String, required: true }
  , triptype: { type: String, required: true }  // Free, Tour, Cruise
  , adultcount: { type: Number, required: true }
  , childcount: { type: Number, required: true }
});

// TODO
var mobileSchema = new mongoose.Schema({
  clientType: { type: String, required: true } // personal ?
  , serviceType: { type: String, required: true }  // Plan Only etc.
  , planType: { type: String, required: true }  // 3g + data etc.
  //, numberCounts: { type: Number, required: true }
  , voiceMinutes: { type: String, required: true }
  , dataVolume: { type: String, required: true }
  , deviceCounts: { type: Number, required: true }
});

var broadbandSchema = new mongoose.Schema({
  description: String
});
var otherSchema = new mongoose.Schema({
  description: String
});

exports.CaseSchema = new mongoose.Schema({
  userid: { type: String, required: true }
  , casetype: { type: String, required: true }
  , casetitle: { type: String, required: true }
  , postdate: { type: String, required: true }
  , remarks: { type: String, required: true }
  , insurancecontent: [insuranceSchema]
  , mobilecontent: [mobileSchema]
  , broadbandcontent: [broadbandSchema]
  , othercontent: [otherSchema]
});
