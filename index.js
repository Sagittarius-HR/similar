const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3001;
const axios = require('axios');
require('dotenv').config();

const db = require('./dbHelpers/db.js');

const jsonParser = bodyParser.json();

app.use(cors());

app.use(express.static('client'));
app.use('/', express.static('client', {index: "./dist/index.html"}));

app.get('/url/:dogId', function(req, res) {
  db.get(req.params.dogId, function(err, dog) {
    if (err) throw new Error(err);
    res.send({url: dog.url, name: dog.name, ranks: dog.ranks});
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'/client/dist/index.html'));
});

app.listen(port, () => {
  console.log('Similar app listening on port ' + port);
  axios({
    method: 'get',
    url: 'http://localhost:3002/api/allBreedsSimilar',
    responseType: 'json'
  })
    .then(function (response) {
      db.saveFromInfo(response.data, function(err, docs) {
        if (err) {
          throw new Error(err);
        } else {
          db.updateRanks();
        }
      });
    });
});

// http://localhost:3002/api/allBreedsSimilar