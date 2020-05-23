import { useSelector } from 'react-redux';

const RenderIfIsAdmin = (props) => {
  const { children } = props;

  const isUserAdmin = useSelector((state) => state.auth.isUserAdmin);

  const content = isUserAdmin ? children : null;
  return content;
};

export default RenderIfIsAdmin;
