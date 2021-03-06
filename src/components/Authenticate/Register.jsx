// DEPENDENCIES
import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import axios from 'axios';

// CSS
import './Register.css';

// COMPONENTS

class Register extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '', 
      displayName: '',
      returnedUserId: false
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
  handlePasswordConfirmChange = (e) => {
    this.setState({passwordConfirm: e.target.value});
  }
  handleDisplayNameChange = (e) => {
    this.setState({displayName: e.target.value});
  }
  handleRegisterSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:5000/api/users/register', this.state)
        .then((result) => {
          console.log(result.data);
          this.setState({ 
            returnedUserId: result.data.userId,
          });
        });
  }

  render(){
    const returnedUserId = this.state.returnedUserId;

    return(
      <div className="Authenticate inner-wrap">
        {
          returnedUserId?
            <Redirect to={"/user/" + returnedUserId} />
          :
          null
        }

        <form onSubmit={this.handleRegisterSubmit} >
          <label htmlFor="username">Username</label>
          <input type="text" id="username" onChange={this.handleUsernameChange} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={this.handlePasswordChange} />
          <label htmlFor="password-confirm">Confirm Password</label>
          <input type="password" id="password-confirm" onChange={this.handlePasswordConfirmChange} />
          <label htmlFor="display">Display Name</label>
          <input type="text" id="display-name" onChange={this.handleDisplayNameChange} />
          <input type="submit" value="Register" />
        </form>
        <p>
          <Link to="/login">Login</Link>
        </p>
      </div>
    )
  }
}

export default Register;