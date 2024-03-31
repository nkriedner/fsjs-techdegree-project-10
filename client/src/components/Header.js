// IMPORT REACT MODULES:
import { useContext } from "react";
import { NavLink } from "react-router-dom";

// IMPORT (USER) CONTEXT:
import UserContext from "../context/UserContext";

// STATELESS FUNCTIONAL HEADER COMPONENT:
const Header = () => {
    // access the user data from context
    const { authUser } = useContext(UserContext);

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    <NavLink to="/">Courses</NavLink>
                </h1>
                <nav>
                    <ul className="header--signedout">
                        {/* Display navigation depending on user login: */}
                        {authUser === null ? (
                            <>
                                {/* If there is no user logged in: */}
                                <li>
                                    <NavLink to="/signup">Sign Up</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/signin">Sign In</NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* IF there is a user logged in: */}
                                <li>
                                    Welcome, {authUser.firstName} {authUser.lastName}!
                                </li>
                                <li>
                                    <NavLink to="/signout">Sign out</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

// EXPORT HEADER COMPONENT:
export default Header;
