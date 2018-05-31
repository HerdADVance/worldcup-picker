// DEPENDENCIES
import React, { Component } from 'react';

// CSS
import './App.css';

// CONSTANTS
//import DECK from './constants/Deck';

// COMPONENTS
import Header from './components/Header/Header';
import Authenticate from './components/Authenticate/Authenticate';
import Dashboard from './components/Dashboard/Dashboard';
import UserProfile from './components/UserProfile/UserProfile';
import TeamSelect from './components/TeamSelect/TeamSelect';
import Footer from './components/Footer/Footer';

// ROUTER
//import routes from './routes/routes';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

// APP
class App extends Component {
  
  state = {
    response: ''
  }

  componentDidMount(){
    // this.callApi()
    //   .then(res => this.setState({ response: res.express}))
    //   .catch(err => console.log(err));
  }

  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();

  //   if(response.status !== 200) throw Error(body.message);

  //   return body;
  // }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <Header />
            <div className="main wrap">
              <Switch>
                <Route exact path="/" component={Authenticate}/>
                <Route exact path="/home" component={Dashboard}/>
                <Route path="/user/:id" component={UserProfile}/>
                <Route path="/team" component={TeamSelect}/>
              </Switch>
            </div>
            <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
