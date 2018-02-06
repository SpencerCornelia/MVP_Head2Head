import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import $ from 'jquery';
import Games from './Games.jsx';
import User from './User.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    }
    this.getGames();
  }

  getGames() {
    $.ajax({
      url: 'http://localhost:3000/nflGames',
      method: 'GET',
      contentType: 'application/json',
      success: function(data) {
        console.log("data =", data)
        this.setState({
          games: data
        });
      }.bind(this),
      error: function(err) {
        console.log("error in get request to repos. err =", err);
      }
    });
  }

  placeBet(gameID, teamID, wager) {
    let betData = {
      gameID: gameID,
      teamID: teamID,
      wager: wager
    };
    $.ajax({
      url: 'http://localhost:3000/placeUserBet',
      data: betData,
      method: 'POST',
      contentType: 'application/json',
      success: function(data) {

      }.bind(this),
      error: function(err) {
        console.log("error in POST request to placeUserBet");
      }
    });
  }

  render() {
    return (<div>
        <h1>Head 2 Head Sports Gambling</h1>
        <Games games={this.state.games} bet={this.placeBet.bind(this)}/>
        <h1>User Component</h1>
        <User />
      </div>
    );
  }
}

export default App;