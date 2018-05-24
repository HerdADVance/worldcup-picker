// DEPENDENCIES
import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import axios from 'axios';

// CSS
import './TeamSelect.css';

// CONSTANTS
import TEAMS from './../../constants/Teams';

class TeamSelect extends Component{
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      selectedTeams: []
    }
  }

  componentDidMount() {
    //
  }

  handleUsernameChange = (e) => {
    this.setState({username: e.target.value});
  }
  handleTeamSelectSubmit = (e) =>{
    // e.preventDefault();
    // axios.post('http://localhost:5000/api/users/new', this.state)
    //     .then((result) => {
    //       console.log(result.data);
    //       this.setState({ 
    //         returnedUserId: result.data.userId,
    //       });
    //     });
  }

  render(){
    const teams = TEAMS;

    return(
      <div className="TeamSelect">
        <h1>Team Select Page</h1>
        <table>
        {teams.map(team => 
          <tr>
            <td><img className="flag" src={"/img/flags/" + team.url + ".svg"} /></td>
            <td>{team.name}</td>
            <td>{team.group}</td>
            <td>${team.price}</td>
          </tr>
        )}
        </table>
      </div>
    )
  }
}

export default TeamSelect;