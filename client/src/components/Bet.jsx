import React, { Component } from 'react';

class Bet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <br />
      Bet:
      <div>GameID: {this.props.bet._id}</div>
      <div>TeamName: {this.props.bet.teamName}</div>
      <div>Wager: {this.props.bet.wagerAmount}</div>
      <br />
    </div>)
  }
}

export default Bet;