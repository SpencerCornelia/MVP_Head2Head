import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Games from './components/Games.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
        <h1>Head 2 Head Sports Gambling</h1>
        <Games />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));