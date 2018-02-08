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
app.use(bodyParser.json());

/* ======== start AUTHENTICATION ROUTES ========== */
app.get('/login', function(req, res) {
  let html = ReactDOMServer.renderToString('Login');
  res.send(html);
});

app.get('/signup', function(req, res) {
  let html = ReactDOMServer.renderToString('Signup');
  res.send(html);
});

app.post('/signup', function(req, res) {
  db.createUser(req.body.username, req.body.bankroll);
  res.send("success");
});
/* ======== end AUTHENTICATION ROUTES ========== */

// use for testing data
var username = 'betterSpencer';

app.post('/createGame', function(req, res) {
  db.createGame(req.body);
  res.send("success");
});

app.get('/nflGames', function(req, res) {
  gameRetrieval.retrieveNFLGames((games) => {
    res.json(games);
  });
});

app.post('/placeUserBet', function(req, res) {
  db.addBet(username, req.body, (user, error) => {
    if (error) {
      res.status(500).send(user);
    } else {
      res.json(user);
    }
  });
});

app.get('/users', function(req, res) {
  db.getAllUsers((users) => {
    res.json(users);
  });
});

app.post('/updateUser', function(req, res) {
  db.updateUser(username, req.body);
  res.send("success");
});

app.get('/getUserBets/:username', function(req, res) {
  db.getUserBets(req.params.username, (user) => {
    res.json(user);
  });
});

app.post('/checkWinner', function(req, res) {
  console.log("req.body =", req.body)
  db.checkWinner(username, req.body, (user, winner) => {
    if (winner) {
      res.json({
        'user': user,
        'result': 'Win',
        'message': 'Player won bet'
      });
    } else {
      res.json({
        'user': user,
        'result': 'Loss',
        'message': 'Player lost bet'
      });
    }
  });
});

let port = 3000;
app.listen(port, function() {
  console.log(`app listening on port ${port}`);
});