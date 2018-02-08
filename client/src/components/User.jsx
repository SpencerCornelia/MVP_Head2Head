import React, { Component } from 'react';
import $ from 'jquery';
import Bet from './Bet.jsx';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bets: []
    }
  }

  render() {
    return (
      <div>
        <div>UserID: {this.props.currentUser._id ? this.props.currentUser._id : 'Loading...'}</div>
        <div>Username: {this.props.currentUser.username ? this.props.currentUser.username : 'Loading...'}</div>
        <div>Bankroll: {this.props.currentUser.bankroll ? this.props.currentUser.bankroll : 'Loading...'}</div>
      </div>
    )
  }
}

export default User;