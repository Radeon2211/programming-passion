import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/indexActions';

class RenderIfIsAdmin extends Component {
  state = {
    isUserAdmin: false,
  };

  async componentDidUpdate() {
    const isUserAdmin = await this.props.onIsAdmin();
    this.setState({ isUserAdmin });
  }

  render () {
    const content = this.state.isUserAdmin
      ? this.props.children
      : null;

    return content;
  }
}

const mapDispatchToProps = (dispatch) => ({
  onIsAdmin: () => dispatch(actions.isAdmin()),
});

export default connect(null, mapDispatchToProps)(RenderIfIsAdmin);