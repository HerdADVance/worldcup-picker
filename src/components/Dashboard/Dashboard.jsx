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
      userTeams: [
        {
          id: 1,
          name: 'My Team 1'
        },
        {
          id: 2,
          name: 'My Team 2'
        },
        {
          id: 3,
          name: 'My Team 3'
        }
      ]
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/user/teams').then(response => this.setState({userTeams: response.data.user_teams}));  
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
      <div className="dashboard">
        <p>Welcome! The 2018 World Cup Picker is a daily fantasy style game. Choose 8 of the 32 squads competing in Russia this summer to form your team while staying within the starting $100 salary. The player with the team whose squads combine for the highest fantasy point total wins.</p>
        
        <div className="half">
        <h2>My Teams (4 Max)</h2>

          <table><thead>
            <tr><th colSpan="2">Teams</th></tr></thead><tbody>
            {this.state.userTeams.map(team => 
              <tr key={team.id}><td><span className="teams-name">{team.name}</span></td><td className="teams-edit"><Link to="/team/">Edit</Link></td></tr>
            )}

            <tr className="teams-create"><td colSpan="2">
              {
                this.state.userTeams.length < 4 ?
                  <Link to="/team">Create a Team</Link>
                :
                  "Can't have more than 4 teams" 
              }
            </td></tr>
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