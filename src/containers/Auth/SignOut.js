import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

class SignOut extends Component {
  componentDidMount() {
    this.props.onSignOut();
  }

  render () {
    return (
      <Redirect to="/" />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSignOut: () => dispatch(actions.signOut()),
});

export default connect(null, mapDispatchToProps)(SignOut);