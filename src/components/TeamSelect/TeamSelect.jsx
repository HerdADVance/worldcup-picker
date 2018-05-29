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

  handleTeamClear = () => {
    var teams = this.state.teams;

    for(var i=0; i < teams.length; i++){
      teams[i].selected = false;
    }

    this.setState({ teams: teams, chosenTeams: [], salary: 100 });
  }

  handleTeamSubmit = (e) =>{
    console.log(this.state.chosenTeams);
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
    var teams = this.state.teams;
    var salary = this.state.salary;

    var selected = chosenTeams.filter(function( obj ) {
      return obj.id == team.id;
    });

    if(chosenTeams.length >= 8){
      alert("Too many teams");
      return;
    }

    if(selected.length === 0){
      for(var i=0; i < teams.length; i++){
        if(teams[i].id === team.id){
          teams[i].selected = true;
        }
      }

      chosenTeams.push(team);
      salary -= team.price;
      this.setState ({ teams: teams, chosenTeams: chosenTeams, salary: salary });
    }
  }

  handleTeamChosenClick = (team) => {
    var chosenTeams = this.state.chosenTeams;
    var teams = this.state.teams;
    var salary = this.state.salary;

    chosenTeams = chosenTeams.filter(function( obj ) {
      return obj.id != team.id;
    });

    for(var i=0; i < teams.length; i++){
      if(teams[i].id === team.id){
        teams[i].selected = false;
      }
    }
  
    salary += team.price;

    this.setState ({ teams: teams, chosenTeams: chosenTeams, salary: salary });
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
        <h1>Choose My Team (<span className={this.state.salary >= 0 ? 'positive' : 'negative'}>${this.state.salary}</span>)</h1>
        <div className="team-select half">
          <table>
          <thead><tr>
            <th onClick={this.handleSortByTeamName}>Squad</th>
            <th onClick={this.handleSortByTeamGroup}>Group</th>
            <th onClick={this.handleSortByTeamPrice}>Price</th>
          </tr></thead><tbody>
          {this.state.teams.map(team => 
            <tr key={team.id} onClick={(e) => this.handleTeamSelectClick(team)} className={team.selected ? 'selected' : ''}>
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
            <th onClick={this.handleSortByTeamName}>Squad</th>
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
          <tr className="team-select-button submit">
            <td colSpan="3">
              <button 
                onClick={(e) => this.handleTeamSubmit()}
                className={this.state.chosenTeams.length == 8 && this.state.salary >= 0 ? 'clickable' : 'not-clickable'}
               > 
                Submit Team
              </button>
            </td>
          </tr>
          <tr className="team-select-button clear">
            <td colSpan="3">
              <button 
                onClick={(e) => this.handleTeamClear()}
               > 
                Clear Team
              </button>
            </td>
          </tr>
          </tbody></table>
        </div>
      </div>
    )
  }
}

export default TeamSelect;