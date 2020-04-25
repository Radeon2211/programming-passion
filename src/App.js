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
import PostDetails from './containers/Posts/PostDetails/PostDetails';
import Settings from './containers/Settings/Settings';
import ChangeName from './containers/Auth/ChangeNick';
import ChangeEmail from './containers/Auth/ChangeEmail';
import ChangePassword from './containers/Auth/ChangePassword';
import ChangePhoto from './containers/Auth/ChangePhoto';
import DeleteAccount from './containers/Auth/DeleteAccount';
import Footer from './components/Footer/Footer';

class App extends Component {
  render () {
    let routes = (
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/posts/:id" component={PostDetails} />
        <Route path="/posts" component={Posts} />
        <Route path="/signout" component={SignOut} />
        <Route path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.authUID) {
      routes= (
        <Switch>
          <Route path="/create" component={CreatePost} />
          <Route path="/posts/:id" component={PostDetails} />
          <Route path="/posts" component={Posts} />
          <Route path="/settings" component={Settings} />
          <Route path="/change-name" component={ChangeName} />
          <Route path="/change-email" component={ChangeEmail} />
          <Route path="/change-password" component={ChangePassword} />
          <Route path="/change-photo" component={ChangePhoto} />
          <Route path="/delete-account" component={DeleteAccount} />
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