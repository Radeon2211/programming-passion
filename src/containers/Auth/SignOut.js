import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

class SignOut extends Component {
  componentDidMount() {
    this.props.onSignOut();
    this.props.history.goBack();
  }

  render () {
    return (
      <Fragment />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSignOut: () => dispatch(actions.signOut()),
});

export default connect(null, mapDispatchToProps)(SignOut);