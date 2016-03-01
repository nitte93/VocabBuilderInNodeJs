// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var vocabSchema = new Schema({
  name : String,
  meaning : String,
  sentence  : String,
  synonyms : String
});

// the schema is useless so far
// we need to create a model using it
var vocabs = mongoose.model('vocabList', vocabSchema);

// make this available to our users in our Node applications
//mongoose.connect( 'mongodb://localhost/contactList' );
module.exports = vocabs;