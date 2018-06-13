// DEPENDENCIES
import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import axios from 'axios';

// CSS
import './App.css';

// AUTHENTICATION 
const authCheck = {
  userId: localStorage.getItem('wc2018_id'),
  authenticate(cb) {
    this.isAuthenticated = true;
  },
  signout(cb){
    this.isAuthenticated = false;
  }
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    authCheck.userId
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

// COMPONENTS
import Header from './components/Header/Header';
import Authenticate from './components/Authenticate/Authenticate';
import Login from './components/Authenticate/Login';
import Register from './components/Authenticate/Register';
import Dashboard from './components/Dashboard/Dashboard';
import UserProfile from './components/UserProfile/UserProfile';
import TeamSelect from './components/TeamSelect/TeamSelect';
import Footer from './components/Footer/Footer';


// APP
class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      redirect: false
    }
  }

  componentDidMount(){
    // this.callApi()
    //   .then(res => this.setState({ response: res.express}))
    //   .catch(err => console.log(err));
  }

  updateAuthCheck = (userId) => {
    authCheck.authenticate();
  }

  render() {
    const userId = authCheck.userId;

    return (
      <BrowserRouter>
        <div className="App">
            <Header />
            <div className="main wrap">
              <Switch>
                <PropsRoute exact path="/" component={Dashboard} userId={userId}/>
                <PropsRoute path="/login" component={Login} triggerAuthCheck={this.updateAuthCheck}/>
                <Route path="/register" component={Register}/>
                <Route path="/user/:id" component={UserProfile}/>
                <PrivateRoute exact path='/team' component={TeamSelect} userId={userId} />
                <PrivateRoute exact path='/team/:id' component={TeamSelect} userId={userId} />
              </Switch>
            </div>
            <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
