import React, { } from 'react';
// import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loading from '../component/Loading';
import { AuthContext } from './AuthContext';


const Private = ({ children }) => {
    const { user, loading } = React.useContext(AuthContext);
     const location = useLocation();
    if (loading) {
        return <div >
            
              <Loading></Loading>
        </div>
    }

    if (user && user?.email) {
        return children;
    }
   return <Navigate to='/login' state={{ from: location }} replace></Navigate>
}

export default Private;