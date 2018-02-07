import React, { Component } from 'react';
import $ from 'jquery';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bets: []
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps =", nextProps)
    if (JSON.stringify(this.props.bets) != JSON.stringify(nextProps.bets)) {
      this.state.bets = nextProps.bets;
    }
  }

  render() {
    return (
      <div>
        <div>UserID: {this.props.currentUser._id ? this.props.currentUser._id : 'Loading...'}</div>
        <div>Username: {this.props.currentUser.username ? this.props.currentUser.username : 'Loading...'}</div>
        <div>Bankroll: {this.props.currentUser.bankroll ? this.props.currentUser.bankroll : 'Loading...'}</div>
        <div>Bets: {this.props.bets[0] ? this.props.bets.map((bet) => {
          <div>
            <br />
            <div>GameID: {bet.gameID}</div>
          </div>
        }) : 'Loading...'}</div>
      </div>
    )
  }
}

export default User;