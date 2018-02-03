const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/head2head').then(
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

let allNFLGames = function(cb) {
  Game.find({sport: 'NFL'}).exec(cb);
};

// use this to create games for test data
// let saveGame = function(body) {
//   var newGame = new Game({
//     sport: 'NFL',
//     away_team: body.away_team,
//     home_team: body.home_team,
//     away_spread: body.away_line,
//     home_spread: body.home_line,
//     away_id: body.away_team_id,
//     home_id: body.home_team_id
//   });

//   newGame.save((err) => {
//     if (err) {
//       console.log('error saving newGame to db')
//     }
//   })
// }

// module.exports.saveGame = saveGame;
module.exports.allNFLGames = allNFLGames;