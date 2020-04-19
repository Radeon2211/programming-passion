import React, { Component, Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar/Navbar';
import Main from './components/UI/Main/Main';
import SignIn from './containers/Auth/SignIn';
import SignUp from './containers/Auth/SignUp';
import Home from './containers/Home/Home';

class App extends Component {
  render () {
    return (
      <Fragment>
        <Navbar />
        <Main>
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </Main>
      </Fragment>
    );
  }
}

export default App;
