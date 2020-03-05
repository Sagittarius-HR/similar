const dbFunctions = require('../dbHelpers/db');
const seed = require('../dbHelpers/seed');
const connection = dbFunctions.db;
test('expect seed to add items to db', (done) => {
  //drop existing items first
  connection.dropCollection('breeds', function(err, result) {
    if (err) {
     // done(err);
    } else {
      // run seed function
      seed(function() {
        dbFunctions.get(1, function(err, dog) {
          if (err) {
           // done(err);
          } else {
            var url = dog.url;
            console.log('THIS IS THE URL ----> ', url);
            expect(url.slice(0, 57)).toBe('https://sagittarius-pups.s3-us-west-1.amazonaws.com/pups/');
            done();
          }
        });
      });
    }
  })
});