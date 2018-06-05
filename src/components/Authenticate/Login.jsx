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
          console.log(result.data.id);
          this.props.triggerAuthCheck(result.data.id);
        });
  }

  render(){

    return(
    	<div className="Authenticate inner-wrap">
		    <form onSubmit={this.handleLoginSubmit}>
		      <label htmlFor="username">Username</label>
		      <input type="text" id="username" onChange={this.handleUsernameChange}/>
		      <label htmlFor="password">Password</label>
		      <input type="password" id="password" onChange={this.handlePasswordChange} />
		      <input type="submit" value="Login" />
		    </form>
		    <p>
		    	<Link to="/register">Register</Link>
		    </p>
	    </div>
    )
  }
}

export default Login;