import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";

const Header = () => {
    const { authUser } = useContext(UserContext);

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    <NavLink to="/">Courses</NavLink>
                </h1>
                <nav>
                    <ul className="header--signedout">
                        {authUser === null ? (
                            <>
                                <li>
                                    <NavLink to="/signup">Sign Up</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/signin">Sign In</NavLink>
                                </li>
                            </>
                        ) : (
                            <>
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

export default Header;
