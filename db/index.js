const mongoose = require('mongoose');
mongoose.connect().then(
  () => { console.log("successful DB connection") },
  err => { console.log("error with DB connection") }
);

let gameSchema = mongoose.Schema({
  id: Number,
  sport: String,
  away_team: String,
  home_team: String,
  away_spread: String,
  away_id: Number,
  home_spread: String,
  home_id: Number
});

let Game = mongoose.model('Game', gameSchema);

let userSchema = mongoose.Schema({
  id: Number,
  username: String,
  bankroll: Number,
  bets: [{
    "gameID": Number,
    "teamID": Number,
    "wagerAmount": Number
  }]
});

let User = mongoose.model('User', userSchema);