import React from 'react';

class Games extends React.Component {
  constructor(props) {
    super(props);
  }

  chooseBet(e) {
    let gameID = e.target.getAttribute('gameid');
    let teamName = e.target.getAttribute('teamname')
    let wager = e.target.getAttribute('wager');
    this.props.bet(gameID, teamName, wager);
  }

  render() {
    return (<div>
      <h4>Today's Games</h4>
      {this.props.games.map((game) =>
        <div key={game._id}>
          <div>{game.away_team} vs. {game.home_team}</div>
          <button gameid={game._id} teamname={game.away_team} wager={20} onClick={(e) => this.chooseBet(e)}>$20 {game.away_spread}</button>
          <button gameid={game._id} teamname={game.home_team} wager={20} onClick={(e) => this.chooseBet(e)}>$20 {game.home_spread}</button><br/>
          <button gameid={game._id} teamname={game.away_team} wager={40} onClick={(e) => this.chooseBet(e)}>$40 {game.away_spread}</button>
          <button gameid={game._id} teamname={game.home_team} wager={40} onClick={(e) => this.chooseBet(e)}>$40 {game.home_spread}</button><br/>
          <button gameid={game._id} teamname={game.away_team} wager={100} onClick={(e) => this.chooseBet(e)}>$100 {game.away_spread}</button>
          <button gameid={game._id} teamname={game.home_team} wager={100} onClick={(e) => this.chooseBet(e)}>$100 {game.home_spread}</button><br/>
          <button gameid={game._id} teamname={game.away_team} wager={250} onClick={(e) => this.chooseBet(e)}>$250 {game.away_spread}</button>
          <button gameid={game._id} teamname={game.home_team} wager={250} onClick={(e) => this.chooseBet(e)}>$250 {game.home_spread}</button><br/>
        </div>
      )}
    </div>)
  }
}

export default Games;