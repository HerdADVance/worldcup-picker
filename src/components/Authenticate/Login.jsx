// DEPENDENCIES
import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import axios from 'axios';

// CSS
import './Login.css';

// COMPONENTS

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    //
  }

  handleUsernameChange = (e) => {
    this.setState({username: e.target.value});
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }
  handleLoginSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:5000/api/users/login', this.state)
        .then((result) => {
          console.log(result.data);
          // this.setState({ 
          //   returnedUserId: result.data.userId,
          // });
        });
  }

  render(){
    return(
    	<div>
		    <form onSubmit={this.handleLoginSubmit}>
		      <label htmlFor="username">Username</label>
		      <input type="text" id="username" onChange={this.handleUsernameChange}/>
		      <label htmlFor="password">Password</label>
		      <input type="password" id="password" onChange={this.handlePasswordChange} />
		      <input type="submit" value="Login" />
		    </form>
		    <p>
		    	<a href="#" onClick={this.props.triggerParentUpdate}>Register</a>
		    </p>
	    </div>
    )
  }
}

export default Login;