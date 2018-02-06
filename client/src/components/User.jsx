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
      user: {},
      bets: []
    }
    this.renderBets();
  }

  renderBets() {
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

  render() {
    return (
      <div>
        <div>User ID: {this.state.user._id}</div>
        <div>Username: {this.state.user.username}</div>
        <div>Bankroll: {this.state.user.bankroll}</div>
        <div>Bets: </div>
        {this.state.bets.map((bet) =>
          <div>
            <div>{bet.wagerAmount}</div>
          </div>
        )}
      </div>
    )
  }
}

export default User;