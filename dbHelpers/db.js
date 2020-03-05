var mongoose = require('mongoose');
require('dotenv').config();


var password = process.env.MONGOKEY;

var produri = 'mongodb+srv://alison:'+ password +'@cluster0-bw2fr.mongodb.net/sagittarius?retryWrites=true&w=majority';
var devuri = 'mongodb://localhost/sagittarius';
var uri = password === undefined ? devuri : produri;

mongoose.connect(uri, {useNewUrlParser: true});
// useUnifiedTopology: true
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to Sagittarius db (similar service)');
});

var rankSchema = new mongoose.Schema({
  id: Number
},{ _id : false });

var breedSchema = new mongoose.Schema({
  id: Number,
  name: String,
  url: String,
  type: String,
  family: String,
  weightMax: Number,
  weightMin: Number,
  heightMax: Number,
  heightMin: Number,
  ranks: [rankSchema]
});

var Breed = mongoose.model('Breed', breedSchema);

var save = function(id, name, url, callback) {
  Breed.findOneAndUpdate({id: id}, {name: name, url: url}, {upsert:true, new:true}, function(err, doc){
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

var get = function(id, callback) {
  Breed.findOne({id: id}, function(err, dog){
    if (err) {
      callback(err);
    } else {
      callback(null, dog);
    }
  })
}

var saveFromInfo = function(data, callback) {
  var filesSaved = 0;
  for (var i = 0; i < data.length; i++) {

    var breedInfo = data[i];
    var id = breedInfo.id;
    
    var updateSpecs = {};

    updateSpecs.name = breedInfo.about.breedName;
    updateSpecs.weightMin = breedInfo.specs.weightMin;
    updateSpecs.weightMax = breedInfo.specs.weightMax;
    updateSpecs.heightMin = breedInfo.specs.heightMin;
    updateSpecs.heightMax = breedInfo.specs.heightMax;
    updateSpecs.type = breedInfo.specs.type;
    updateSpecs.family = breedInfo.specs.family;
    updateSpecs.ranks = [];
    
    var errStatus = false;

    Breed.findOneAndUpdate({id: id}, updateSpecs, {useFindAndModify:false}, function(err, doc) {
      filesSaved++;
      if (err) {
        callback(err, null);
        errStatus = true;
      } 
      if (filesSaved === data.length) {
        callback(null);
      }
    });

    if (errStatus) break;
  };
}

var updateRanks = function(callback) {
  Breed.find({},{}, function(err, docs){

    for (var i = 0; i < docs.length; i++) {
      // For each document find the average weight and type
      var currWeightAvg = (docs[i].weightMax + docs[i].weightMin)/2;
      if (isNaN(currWeightAvg)) continue;  //no weights then break loop

      var currType = docs[i].type;

      // Clear out existing ranks
      docs[i].ranks = [];

      // Loop through docs to find those similar to current doc
      for (var j = 0; j < docs.length; j++) {
        var compWeightAvg = (docs[j].weightMax + docs[j].weightMin)/2;
        if (isNaN(currWeightAvg) || i === j) continue; // no weights then break loop

        var compType = docs[j].type;

        // If they are the same type then examine how similar weights are
        if (compType === currType) {
          if (Math.abs(1-compWeightAvg/currWeightAvg) <= .5) {
            // Include dogs that have weights within 50% of current dog
            docs[i].ranks.push({id: docs[j].id});
          }
        } 
      }
      docs[i].save();
  
    }
  })
}

module.exports.save = save;
module.exports.get = get;
module.exports.db = db;
module.exports.saveFromInfo = saveFromInfo;
module.exports.updateRanks = updateRanks;