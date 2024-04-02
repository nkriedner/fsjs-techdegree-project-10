// IMPORT REACT MODULES:
import { useState, useRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// IMPORT (USER) CONTEXT:
import UserContext from "../context/UserContext";

// STATEFUL FUNCTIONAL USER SIGNUP COMPONENT:
const UserSignUp = () => {
    // access the user actions from context
    const { actions } = useContext(UserContext);
    // invoke useNavigate hook to navigate programmatically
    const navigate = useNavigate();

    // access form data with useRef hooks
    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);
    // create state for error messages
    const [errors, setErrors] = useState([]);

    // HANDLE FORM SUBMISSION FOR SIGNING UP A NEW USER:
    const handleSubmit = async (e) => {
        // prevent default behavior of form submissions
        e.preventDefault();
        console.log("handleSubmit running...");

        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        };

        // define the option parameters for the following fetch request
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(user),
        };

        try {
            const response = await fetch("http://localhost:5000/api/users", fetchOptions);
            if (response.status === 201) {
                console.log(`${user.firstName} ${user.lastName} is successfully signed up and authenticated!`);
                await actions.signIn(user);
                navigate("/");
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
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
                <h2>Sign Up</h2>

                {/* Show Validation errors if there are any */}
                {errors.length ? (
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.map((error, i) => (
                                <li key={i}>{error}!</li>
                            ))}
                        </ul>
                    </div>
                ) : null}

                {/* Form fields for signing up a new user */}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" ref={firstName} type="text" />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" ref={lastName} type="text" />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" ref={emailAddress} type="email" />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" ref={password} type="password" />
                    <button className="button" type="submit">
                        Sign Up
                    </button>
                    <button className="button button-secondary" onClick={handleCancel}>
                        Cancel
                    </button>
                </form>
                <p>
                    Already have a user account? Click here to <NavLink to="/signin">sign in</NavLink>!
                </p>
            </div>
        </main>
    );
};

// EXPORT USER SIGNUP COMPONENT:
export default UserSignUp;
