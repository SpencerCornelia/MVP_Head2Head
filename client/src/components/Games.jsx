import React from 'react';

class Games extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <h4>Today's Games</h4>
      {this.props.games.map((game) =>
        <div key={game._id}>
          <div>{game.away_team} vs. {game.home_team}</div>
          <button>$20 {game.away_spread}</button>
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