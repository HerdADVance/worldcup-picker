// DEPENDENCIES
import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import axios from 'axios';

// CSS
import './Dashboard.css';

// COMPONENTS

class Dashboard extends Component{
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
  handleDashboardSubmit = (e) =>{
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
      <div className="instructions">
        <p>Welcome! The 2018 World Cup Picker is a daily fantasy style game. Choose 8 of the 32 squads competing in Russia this summer to form your team while staying within the starting $100 salary. The player with the team whose squads combine for the highest fantasy point total wins.</p>
        
        <div className="half">
        <h2>My Teams</h2>

          <table><thead>
            <tr><th colSpan="2">Teams</th></tr></thead><tbody>
            <tr><td>Team 1</td><td><button>Edit</button></td></tr>
            <tr><td>Team 2</td><td><button>Edit</button></td></tr>
            <tr><td>Team 3</td><td><button>Edit</button></td></tr>
            <tr><td colSpan="2"><button>Create a Team</button></td></tr>
          </tbody></table>
          
          <h2>Payouts</h2>
          
          <table><thead>
            <tr><th colSpan="2">Prizes</th></tr></thead><tbody>
            <tr><td>1st Place</td><td>70%</td></tr>
            <tr><td>2nd Place</td><td>20%</td></tr>
            <tr><td>3rd Place</td><td>10%</td></tr>
          </tbody></table>

        </div>

        <div className="half">
          <h2>Scoring</h2>
          
          <table><thead>
            <tr><th colSpan="2">All Matches</th></tr></thead><tbody>
            <tr><td>Goals</td><td>1 point</td></tr>
          </tbody></table>
          
          <table><thead>
            <tr><th colSpan="2">Group Stage</th></tr></thead><tbody>
            <tr><td>Match Win</td><td>3 points</td></tr>
            <tr><td>Match Draw</td><td>1 point</td></tr>
            <tr><td>1st in Group</td><td>6 points</td></tr>
            <tr><td>2nd in Group </td><td>3 points</td></tr>
          </tbody></table>
          
          <table><thead>
            <tr><th colSpan="2">Knockout Stage</th></tr></thead><tbody>
            <tr><td>Round of 16 Win</td><td>3 points</td></tr>
            <tr><td>Quarterfinal Win</td><td>6 points</td></tr>
            <tr><td>Semifinal Win</td><td>9 points</td></tr>
            <tr><td>Final Win</td><td>12 points</td></tr>
            <tr><td>3rd Place Match Win</td><td>3 points</td></tr>
            <tr><td>Loss in Extra Time/Shootout</td><td>1 point</td></tr>
          </tbody></table>

        </div>
        
	    </div>


    )
  }
}

export default Dashboard;