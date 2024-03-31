// IMPORT REACT MODULES:
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// IMPORT (USER) CONTEXT:
import UserContext from "../context/UserContext";

// STATELESS FUNCTIONAL PRIVATE ROUTE COMPONENT:
const PrivateRoute = () => {
    // access the user data from context
    const { authUser } = useContext(UserContext);
    const location = useLocation();
    // console.log(location);

    if (authUser) {
        return <Outlet />;
    } else {
        return <Navigate to="/signin" state={{ from: location.pathname }} />;
    }
};

// EXPORT PRIVATE ROUTE COMPONENT:
export default PrivateRoute;
