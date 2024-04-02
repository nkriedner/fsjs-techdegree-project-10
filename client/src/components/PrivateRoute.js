// IMPORT REACT MODULES:
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// IMPORT (USER) CONTEXT:
import UserContext from "../context/UserContext";

// STATELESS FUNCTIONAL PRIVATE ROUTE COMPONENT:
const PrivateRoute = () => {
    // access the user data from context
    const { authUser } = useContext(UserContext);
    // invoke useLocation hook to retrieve current location from the React Router DOM
    const location = useLocation();

    // check if there is an authenticated user
    if (authUser) {
        // if there is -> display the nested route
        return <Outlet />;
    } else {
        // if there is no authenticated user -> forward to /signin route
        return <Navigate to="/signin" state={{ from: location.pathname }} />;
    }
};

// EXPORT PRIVATE ROUTE COMPONENT:
export default PrivateRoute;
