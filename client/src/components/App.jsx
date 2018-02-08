import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import $ from 'jquery';
import Games from './Games.jsx';
import User from './User.jsx';
import Bet from './Bet.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      user: {},
      bets: []
    }
    this.getGames();
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost:3000/getUserBets/scornelia',
      method: 'GET',
      contentType: 'application/json',
      success: function(data) {
        this.setState({
          user: data,
          bets: data.bets
        });
      }.bind(this),
      error: function(err) {
        console.log("error in get request to repos. err =", err);
      }
    });
  }

  getGames() {
    $.ajax({
      url: 'http://localhost:3000/nflGames',
      method: 'GET',
      contentType: 'application/json',
      success: function(data) {
        this.setState({
          games: data
        });
      }.bind(this),
      error: function(err) {
        console.log("error in get request to repos. err =", err);
      }
    });
  }

  placeBet(gameID, teamName, wager) {
    let betData = {
      gameID: gameID,
      teamName: teamName,
      wager: wager
    };
    $.ajax({
      url: 'http://localhost:3000/placeUserBet',
      data: JSON.stringify(betData),
      method: 'POST',
      contentType: 'application/json',
      success: function(data) {
        this.setState({
          user: data,
          bets: data.bets
        });
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
        <User currentUser={this.state.user} bets={this.state.bets} />
        {this.state.bets.map((bet) => {
          return <Bet bet={bet} key={bet._id} />
        })}
      </div>
    );
  }
}

export default App;

/*
  render() {
    return (<div>
        <h1>Head 2 Head Sports Gambling</h1>
        <Games games={this.state.games} bet={this.placeBet.bind(this)}/>
        <h1>User Component</h1>
        <User currentUser={this.state.user} />
        {this.state.bets.map((bet) => {
          return <Bet bet={bet} key={bet._id} />
        })}
      </div>
    );
  }

*/