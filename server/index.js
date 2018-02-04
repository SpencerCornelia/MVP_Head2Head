const express = require('express');
const bodyParser = require('body-parser');
const ReactDOMServer = require('react-dom/server');
let app = express();

const gameRetrieval = require('../helpers/gameretrieval.js');

// use this for testing/adding initial data to db
const db = require('../db/index.js');

app.set('views', __dirname + '../../client/src/components');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-render-jsx'));

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({extended: true}));

/* ======== start AUTHENTICATION ROUTES ========== */
app.get('/login', function(req, res) {
  let html = ReactDOMServer.renderToString('Login');
  res.send(html);
});

app.get('/signup', function(req, res) {
  let html = ReactDOMServer.renderToString('Signup');
  res.send(html);
});
/* ======== end AUTHENTICATION ROUTES ========== */

app.post('/createGame', function(req, res) {
  db.saveGame(req.body);
});

app.get('/nflGames', function(req, res) {
  gameRetrieval.retrieveNFLGames((games) => {
    res.json(games);
  });
});

app.post('/placeUserBet', function(req, res) {
  // get user from req.session.username
});

let port = 3000;
app.listen(port, function() {
  console.log(`app listening on port ${port}`);
});