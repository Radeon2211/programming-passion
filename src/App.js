import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar/Navbar';
import Main from './components/UI/Main/Main';
import SignIn from './containers/Auth/SignIn';
import SignUp from './containers/Auth/SignUp';
import SignOut from './containers/Auth/SignOut';
import Home from './containers/Home/Home';
import CreatePost from './containers/CreatePost/CreatePost';
import Posts from './containers/Posts/Posts';
import Footer from './components/Footer/Footer';

class App extends Component {
  render () {
    let routes = (
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signout" component={SignOut} />
        <Route path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.authUID) {
      routes= (
        <Switch>
          <Route path="/create" component={CreatePost} />
          <Route path="/posts" component={Posts} />
          <Route path="/signout" component={SignOut} />
          <Redirect to="/posts" />
        </Switch>
      );
    }

    return (
      <Fragment>
        <Navbar isAuth={this.props.authUID} />
        <Main>
          {routes}
        </Main>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  authUID: state.firebase.auth.uid,
});

export default connect(mapStateToProps)(App);