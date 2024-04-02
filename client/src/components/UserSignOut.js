// IMPORT REACT MODULES:
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

// IMPORT (USER) CONTEXT:
import UserContext from "../context/UserContext";

// STATELESS FUNCTIONAL USER SIGNOUT COMPONENT:
const UserSignOut = () => {
    // access the user actions from context
    const { actions } = useContext(UserContext);
    // sign out the user
    useEffect(() => actions.signOut());
    // forward to home route
    return <Navigate to="/" replace />;
};

// EXPORT USER SIGNOUT COMPONENT:
export default UserSignOut;
