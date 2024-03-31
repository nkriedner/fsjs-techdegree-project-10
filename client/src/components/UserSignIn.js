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
    const location = useLocation();
    // console.log(location);

    // State
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    // Event Handlers
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents the default behavior of form submissions

        let from = "/";
        if (location.state) {
            from = location.state.from;
        }

        const credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        };

        try {
            // Get user from UserContext
            const user = await actions.signIn(credentials);

            // Check if sign in was successful
            if (user) {
                navigate(from);
            } else {
                setErrors(["Sign-in was unsuccessful"]);
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    };

    const handleCancel = (e) => {
        e.preventDefault(); // prevents the default behavior of form submissions
        navigate("/");
    };

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                {errors.length ? (
                    <>
                        {errors.map((error, i) => (
                            <div key={i}>{error}</div>
                        ))}
                    </>
                ) : null}

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
