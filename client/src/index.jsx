import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Games from './components/Games.jsx';

class App extends React.Component {
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

  render() {
    return (<div>
        <h1>Head 2 Head Sports Gambling</h1>
        <Games games={this.state.games}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));