const express = require('express');
const bodyParser = require('body-parser');
let app = express();
const gameRetrieval = require('../helpers/gameretrieval.js');

// use this for testing/adding initial data to db
const db = require('../db/index.js');

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({extended: true}));

app.post('/createGame', function(req, res) {
  db.saveGame(req.body);
});

app.get('/nflGames', function(req, res) {
  gameRetrieval.retrieveNFLGames((games) => {
    res.json(games);
  });
});

let port = 3000;
app.listen(port, function() {
  console.log(`app listening on port ${port}`);
});