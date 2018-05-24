// DEPENDENCIES
import React, { Component } from 'react';

// CSS
import './Header.css';

// CONSTANTS

// COMPONENTS

// APP
class Header extends Component {
  
  state = {
    response: ''
  }

  componentDidMount(){
  }

  render() {
    return (
      <div className="Header">
        <div className="TopHeader wrap">
          <span>Login | Register</span>
        </div>
        <div className="MiddleHeader wrap">
          <a href="/" className="logo no-underline">2018 World Cup Picker</a>
        </div>
        <div className="BottomHeader wrap">
        </div>
      </div>
    );
  }
}

export default Header;
