import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (<div>
      <form method="POST" action="/login">
        <label>Username:</label><input type="text" placeholder="Enter Username" name="username" required />
        <label>Password:</label><input type="text" placeholder="Enter Password" name="password" required />
      </form>
    </div>)
  }
}

export default Login;
