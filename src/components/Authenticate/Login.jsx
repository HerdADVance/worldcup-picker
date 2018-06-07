// DEPENDENCIES
import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import axios from 'axios';

// CSS
import './Login.css';

// COMPONENTS

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      theRedirect: false
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
    axios.post('http://localhost:5000/api/users/login', {username: this.state.username, password: this.state.password})
        .then((result) => {
          console.log(result.data.id);
          localStorage.setItem('wc2018_id', result.data.id);
          this.setState({ theRedirect: '/register' });
        });
  }

  render(){

    const { theRedirect } = this.state;

    if (theRedirect) {
      return (<BrowserRouter><Switch><Redirect to={theRedirect} /></Switch></BrowserRouter>);
    }

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