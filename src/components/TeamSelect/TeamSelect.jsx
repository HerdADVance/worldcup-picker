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
      chosenTeams: [],
      salary: 100
    }
  }

  componentDidMount() {
    this.setState({ teams: TEAMS.sort(this.sortByTeamPrice) });
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

  handleSortByTeamGroup = () => {
    this.setState ({ teams: this.state.teams.sort(this.sortByTeamGroup) });
  }
  handleSortByTeamName = () => {
    this.setState ({ teams: this.state.teams.sort(this.sortByTeamName) });
  }
  handleSortByTeamPrice = () => {
    this.setState ({ teams: this.state.teams.sort(this.sortByTeamPrice) });
  }
  handleTeamSelectClick = (team) => {
    var chosenTeams = this.state.chosenTeams;
    var salary = this.state.salary;

    chosenTeams.push(team);
    salary -= team.price;

    this.setState ({ chosenTeams: chosenTeams, salary: salary });
  }

  handleTeamChosenClick = (team) => {
    var chosenTeams = this.state.chosenTeams;
    var salary = this.state.salary;

    chosenTeams = chosenTeams.filter(function( obj ) {
      return obj.id != team.id;
    });
  
    salary += team.price;

    this.setState ({ chosenTeams: chosenTeams, salary: salary });
  }

  sortByTeamGroup = (a,b) => {
      if (a.group < b.group)
        return -1;
      if (a.group > b.group)
        return 1;
      return 0;
  }
  sortByTeamName = (a,b) => {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
  }
  sortByTeamPrice = (a,b) => {
      if (a.price > b.price)
        return -1;
      if (a.price < b.price)
        return 1;
      return 0;
  }

  render(){
    return(
      <div className="TeamSelect">
        <h1>Choose My Team (${this.state.salary})</h1>
        <div className="team-select half">
          <table>
          <thead><tr>
            <th onClick={this.handleSortByTeamName}>Team</th>
            <th onClick={this.handleSortByTeamGroup}>Group</th>
            <th onClick={this.handleSortByTeamPrice}>Price</th>
          </tr></thead><tbody>
          {this.state.teams.map(team => 
            <tr key={team.id} onClick={(e) => this.handleTeamSelectClick(team)}>
              <td><img className="team-select-flag" src={"/img/flags/" + team.url + ".svg"} /><span className="team-select-name">{team.name}</span></td>
              <td className="team-select-group">{team.group}</td>
              <td className="team-select-price">${team.price}</td>
            </tr>
          )}
          </tbody></table>
        </div>
        <div className="team-select half">
          <table>
          <thead><tr>
            <th onClick={this.handleSortByTeamName}>Team</th>
            <th onClick={this.handleSortByTeamGroup}>Group</th>
            <th onClick={this.handleSortByTeamPrice}>Price</th>
          </tr></thead><tbody>
          {this.state.chosenTeams.map(team => 
            <tr key={team.id} onClick={(e) => this.handleTeamChosenClick(team)}>
              <td><img className="team-select-flag" src={"/img/flags/" + team.url + ".svg"} /><span className="team-select-name">{team.name}</span></td>
              <td className="team-select-group">{team.group}</td>
              <td className="team-select-price">${team.price}</td>
            </tr>
          )}
          </tbody></table>
        </div>
      </div>
    )
  }
}

export default TeamSelect;