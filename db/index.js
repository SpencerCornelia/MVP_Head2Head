const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gambling').then(
  () => { console.log("successful DB connection") },
  err => { console.log("error with DB connection") }
);


/* ========== Game ========== */
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

let createGame = function(body) {
  var newGame = new Game({
    sport: 'NFL',
    away_team: body.away_team,
    home_team: body.home_team,
    away_spread: body.away_spread,
    away_id: body.away_id,
    home_spread: body.home_spread,
    home_id: body.home_id
  });

  newGame.save((err) => {
    if (err) {
      console.log("error saving newGame to db");
    }
  });
};

let allNFLGames = function(cb) {
  Game.find({sport: 'NFL'}).exec(cb);
};


/* ========== USER ========== */
let userSchema = mongoose.Schema({
  id: Number,
  username: String,
  bankroll: Number,
  bets: [{
    "gameID": String,
    "teamName": String,
    "wagerAmount": Number
  }]
});

let User = mongoose.model('User', userSchema);

let createUser = function(username, bankroll) {
  var newUser = new User({
    "username": username,
    "bankroll": bankroll,
    "bets": []
  });

  newUser.save((err) => {
    if (err) {
      console.log("error saving newUser to db");
    }
  });
};

let updateUser = function(username, body) {
  User.findOne({"username": username}, (err, user)  => {
    if (err) {
      console.log("error finding user in updateUser");
    } else {
      user.username = username,
      user.bankroll = body.bankroll,
      user.bets = body.bets
    }
  });
}

let addBet = function(username, bet, cb) {
  User.findOne({"username": username}, (err, user) => {
    if (err) {
      console.log("error finding user to addBet");
      cb({'result': 'error', 'message': err}, true);
    } else {
      let updateBet = {
        "gameID": parseInt(bet.gameID),
        "teamName": bet.teamName,
        "wagerAmount": parseInt(bet.wager)
      }
      user.bets.push(updateBet);
      user.bankroll = user.bankroll - updateBet.wagerAmount;
      user.save((err, updatedUser) => {
        if (err) {
          console.log("error adding bet to user, err=", err);
        } else {
          console.log("updated user's bets.");
          cb(updatedUser, false);
        }
      });
    }
  });
};

let checkWinner = function(username, bet, cb) {
  User.findOne({"username": username}, (err, user) => {
    if (err) {
      console.log("error finding user in checkWinner");
    } else {
      if (bet.gameID === '5a79328cb03ef73aba97d015' && bet.teamName === 'Browns') {
        user.bankroll = user.bankroll += parseInt(bet.wager);
        user.save((err, user) => {
          if (err) {
            console.log("error adding user in checkWinner, err=", err);
          } else {
            cb(user, true);
          }
        });
      } else if (bet.gameID === '5a7932b9b03ef73aba97d018' && bet.teamName === 'Titans') {
        user.bankroll = user.bankroll += parseInt(bet.wager);
        user.save((err, user) => {
          if (err) {
            console.log("error adding user in checkWinner");
          } else {
            cb(user, true);
          }
        });
      } else if (bet.gameID === '5a793252b03ef73aba97d014' && bet.teamName === 'Patriots') {
        user.bankroll = user.bankroll += parseInt(bet.wager);
        user.save((err, user) => {
          if (err) {
            console.log("error adding user in checkWinner");
          } else {
            cb(user, true);
          }
        });
      } else if (bet.gameID === '5a7932a9b03ef73aba97d017' && bet.teamName === 'Texans') {
        user.bankroll = user.bankroll += parseInt(bet.wager);
        user.save((err, user) => {
          if (err) {
            console.log("error adding user in checkWinner");
          } else {
            cb(user, true);
          }
        });
      } else if (bet.gameID === '5a793299b03ef73aba97d016' && bet.teamName === 'Cardinals') {
        user.bankroll = user.bankroll += parseInt(bet.wager);
        user.save((err, user) => {
          if (err) {
            console.log("error adding user in checkWinner");
          } else {
            cb(user, true);
          }
        });
      } else {
        cb(user, false);
      }
    }
  });
};

let getUserBets = function(username, cb) {
  User.findOne({"username": username}, (err, user) => {
    if (err) {
      console.log("error finding user in getUserBets");
    } else {
      cb(user);
    }
  });
};

let getAllUsers = function(cb) {
  User.find({}, (err, users) => {
    cb(users);
  });
};

module.exports.createGame = createGame;
module.exports.allNFLGames = allNFLGames;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.addBet = addBet;
module.exports.checkWinner = checkWinner;
module.exports.getUserBets = getUserBets;
module.exports.getAllUsers = getAllUsers;