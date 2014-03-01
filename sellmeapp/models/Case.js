var mongoose = require('mongoose');
var insuranceSchema = new mongoose.Schema({
  dest: { type: String, required: true },
  date: { type: String, required: true },
  adultcount: { type: Number, required: true },
  childcount: { type: Number, required: true },
});

// TODO
var mobileSchema = new mongoose.Schema({ 
  description: String
});
var broadbandSchema = new mongoose.Schema({ 
  description: String
});
var otherSchema = new mongoose.Schema({ 
  description: String
});

exports.CaseSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  casetype: { type: String, required: true },
  casetitle: { type: String, required: true },
  insurancecontent: [insuranceSchema],
  mobilecontent: [mobileSchema],
  broadbandcontent: [broadbandSchema],
  othercontent: [otherSchema]
});
