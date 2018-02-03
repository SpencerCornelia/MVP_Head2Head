const db = require('../db/index.js');

let retrieveNFLGames = (cb) => {
  db.allNFLGames((err, games) => {
    if (err) {
      console.log("error in retrieveGames with getting all NFL games")
    } else {
      cb(games);
    }
  });
}

module.exports.retrieveNFLGames = retrieveNFLGames;