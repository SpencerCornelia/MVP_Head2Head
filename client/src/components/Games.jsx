import React from 'react';

class Games extends React.Component {
  constructor(props) {
    super(props);
  }

  chooseBet(e) {
    let gameID = e.target.getAttribute('gameid');
    let teamID = e.target.getAttribute('teamid')
    let wager = e.target.getAttribute('wager');
    this.props.bet(gameID, teamID, wager);
  }

  render() {
    return (<div>
      <h4>Today's Games</h4>
      {this.props.games.map((game) =>
        <div key={game._id}>
          <div>{game.away_team} vs. {game.home_team}</div>
          <button gameid={game._id} teamid={game.away_id} wager={20} onClick={(e) => this.chooseBet(e)}>$20 {game.away_spread}</button>
          <button>$20 {game.home_spread}</button><br/>
          <button>$40 {game.away_spread}</button>
          <button>$40 {game.home_spread}</button><br/>
          <button>$100 {game.away_spread}</button>
          <button>$100 {game.home_spread}</button><br/>
          <button>$250 {game.away_spread}</button>
          <button>$250 {game.home_spread}</button><br/>
        </div>
      )}
    </div>)
  }
}

export default Games;