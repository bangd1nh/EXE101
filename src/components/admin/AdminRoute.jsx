import { Navigate } from 'react-router-dom';
import { getUserRole } from '../../services/user.js'; 

const AdminRoute = ({ children }) => {
  const role = getUserRole();

  if (role !== 'ADMIN') {
    return <Navigate to="/blogs" replace />;
  }

  return children;
};

export default AdminRoute;
