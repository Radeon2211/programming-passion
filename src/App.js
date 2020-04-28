import React, { Component, Fragment, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import * as actions from './store/actions/indexActions';
import Loader from './components/UI/Loader/Loader';

import Navbar from './components/Navigation/Navbar/Navbar';
import Main from './components/UI/Main/Main';
import Home from './containers/Home/Home';
import SignOut from './containers/Auth/SignOut';
import Posts from './containers/Posts/Posts';
import PostDetails from './containers/PostDetails/PostDetails';
import MyPosts from './containers/MyPosts/MyPosts';
import Footer from './components/Footer/Footer';

const SignIn = lazy(() => import('./containers/Auth/SignIn'));
const SignUp = lazy(() => import('./containers/Auth/SignUp'));
const CreatePost = lazy(() => import('./containers/CreatePost/CreatePost'));
const Settings = lazy(() => import('./containers/Settings/Settings'));
const ChangeName = lazy(() => import('./containers/Auth/ChangeName'));
const ChangeEmail = lazy(() => import('./containers/Auth/ChangeEmail'));
const ChangePassword = lazy(() => import('./containers/Auth/ChangePassword'));
const ChangePhoto = lazy(() => import('./containers/Auth/ChangePhoto'));
const DeleteAccount = lazy(() => import('./containers/Auth/DeleteAccount'));
const AddAdmin = lazy(() => import('./containers/Auth/AddAdmin'));

const WaitingComponent = (Component) => {
  return (props) => (
    <Suspense fallback={<div style={{ textAlign: 'center' }}><Loader size="Big" /></div>}>
      <Component  {...props} />
    </Suspense>
  );
};

class App extends Component {
  render () {
    let routes = (
      <Switch>
        <Route path="/signin" component={WaitingComponent(SignIn)} />
        <Route path="/signup" component={WaitingComponent(SignUp)} />
        <Route path="/posts/:id" component={PostDetails} />
        <Route path="/posts" component={Posts} />
        <Route path="/signout" component={SignOut} />
        <Route path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.authUID) {
      routes = (
        <Switch>
          <Route path="/posts/:id" component={PostDetails} />
          <Route path="/posts" component={Posts} />
          <Route path="/create" component={WaitingComponent(CreatePost)} />
          <Route path="/settings" component={WaitingComponent(Settings)} />
          <Route path="/change-name" component={WaitingComponent(ChangeName)} />
          <Route path="/change-email" component={WaitingComponent(ChangeEmail)} />
          <Route path="/change-password" component={WaitingComponent(ChangePassword)} />
          <Route path="/change-photo" component={WaitingComponent(ChangePhoto)} />
          <Route path="/delete-account" component={WaitingComponent(DeleteAccount)} />
          <Route path="/my-posts" render={() => <MyPosts authUID={this.props.authUID} />} />
          <Route path="/signout" component={SignOut} />
          <Route path="/add-admin" component={WaitingComponent(AddAdmin)} />
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

const mapDispatchToProps = (dispatch) => ({
  onIsAdmin: () => dispatch(actions.isAdmin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);