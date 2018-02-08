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
      bets: [],
      hasError: false,
      errorMessage: ''
    }
    this.getGames();
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost:3000/getUserBets/betterSpencer',
      method: 'GET',
      contentType: 'application/json',
      success: function(data) {
        this.setState({
          user: data,
          bets: data.bets
        });
      }.bind(this),
      error: function(err) {
        this.setState({
          hasError: true
        });
      }.bind(this)
    });
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
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
        this.setState({
          hasError: true
        });
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
        this.setState({
          hasError: true,
          errorMessage: err.message
        });
      }.bind(this)
    });
    setTimeout(() => {
      this.checkWinner(betData);
    }, 5000);
  }

  checkWinner(betData) {
    $.ajax({
      url: "http://localhost:3000/checkWinner",
      data: JSON.stringify(betData),
      method: 'POST',
      contentType: 'application/json',
      success: function(data) {
        alert(data.message)
        this.setState({
          user: data.user
        });
      }.bind(this),
      error: function(err) {
        console.log("err =", err);
      }.bind(this)
    });
  }

  render() {
    if (this.state.hasError) {
      return <div>Error. Refresh the page</div>
    } else {
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
}

export default App;
