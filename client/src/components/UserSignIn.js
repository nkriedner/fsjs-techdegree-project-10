// IMPORT REACT MODULES:
import { useContext, useRef, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

// IMPORT (USER) CONTEXT:
import UserContext from "../context/UserContext";

// STATEFUL FUNCTIONAL USER SIGNIN COMPONENT:
const UserSignIn = () => {
    // access the user actions from context
    const { actions } = useContext(UserContext);
    // invoke useNavigate hook to navigate programmatically
    const navigate = useNavigate();
    // invoke useLocation hook to retrieve current location from the React Router DOM
    const location = useLocation();
    // access form data with useRef hooks
    const emailAddress = useRef(null);
    const password = useRef(null);
    // create state for error messages
    const [errors, setErrors] = useState([]);

    // HANDLE FORM SUBMISSION FOR SIGNING A USER IN:
    const handleSubmit = async (e) => {
        // prevent default behavior of form submissions
        e.preventDefault();

        // define 'from' as the url location origin
        let from = "/";
        if (location.state) {
            from = location.state.from;
        }

        // define the user credentials with the signin user data
        const credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        };

        try {
            // get user from UserContext
            const user = await actions.signIn(credentials);

            // check if sign in was successful
            if (user) {
                // if it was successful -> forward to the original url 'FROM' before
                navigate(from);
            } else {
                // it it was unsuccessfull -> display error message
                setErrors(["Sign-in was unsuccessful"]);
            }
        } catch (error) {
            console.log(error);
            // forward to /error route
            navigate("/error");
        }
    };

    // HANDLE 'CANCEL' BUTTON CLICKS:
    const handleCancel = (e) => {
        // prevent default behavior of form submissions
        e.preventDefault();
        // forward to home route
        navigate("/");
    };

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>

                {/* Show Validation errors if there are any */}
                {errors.length ? (
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.map((error, i) => (
                                <li key={i}>{error}</li>
                            ))}
                        </ul>
                    </div>
                ) : null}

                {/* Form fields for signing in an existing user */}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password} />
                    <button className="button" type="submit">
                        Sign In
                    </button>
                    <button className="button button-secondary" onClick={handleCancel}>
                        Cancel
                    </button>
                </form>
                <p>
                    Don't have a user account? Click here to <NavLink to="/signup">sign up</NavLink>!
                </p>
            </div>
        </main>
    );
};

// EXPORT USER SIGNIN COMPONENT:
export default UserSignIn;
