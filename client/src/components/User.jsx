import React, { Component } from 'react';
import $ from 'jquery';

class User extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   user: {
    //     userID: '',
    //     username: '',
    //     bankroll: '',
    //     bets: [
    //       "gameID": '',
    //       "teamname": '',
    //       "wagerAmount": ''
    //     ]
    //   }
    this.state = {
      user: {}
    }
    this.renderBets();
  }

  renderBets() {
    $.ajax({
      url: 'http://localhost:3000/getUserBets/scornelia',
      method: 'GET',
      contentType: 'application/json',
      success: function(data) {
        console.log("data =", data)
        this.setState({
          user: data
        });
      }.bind(this),
      error: function(err) {
        console.log("error in get request to repos. err =", err);
      }
    });
  }

  render() {
    return (
      <div>
        <div>User ID: {this.state.user._id}</div>
        <div>Username: {this.state.user.username}</div>
        <div>Bankroll: {this.state.user.bankroll}</div>
        <div>Bets: {this.state.user.bets === undefined ? '' : this.state.user.bets.forEach((bet) => {
          <div>
          <div>BetId: bet._id</div>
          <div>GameID: bet.gameID</div>
          <div>TeamName: bet.teamName</div>
          <div>Wager: bet.wagerAmount</div>
          </div>
        })}</div>
      </div>
    )
  }
}

export default User;