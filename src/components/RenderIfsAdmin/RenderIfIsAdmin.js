import { connect } from 'react-redux';

const RenderIfIsAdmin = ({ isUserAdmin, children }) => {
  const content = isUserAdmin
  ? children
  : null;

  return content;
};

const mapStateToProps = (state) => ({
  isUserAdmin: state.auth.isUserAdmin,
});

export default connect(mapStateToProps)(RenderIfIsAdmin);