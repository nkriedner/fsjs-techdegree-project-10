import { useContext, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const UserSignIn = () => {
    const { actions } = useContext(UserContext);
    const navigate = useNavigate();

    // State
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    // Event Handlers
    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        };

        try {
            // Get user from UserContext
            const user = await actions.signIn(credentials);

            // Check if sign in was successful
            if (user) {
                navigate("/");
            } else {
                setErrors(["Sign-in was unsuccessful"]);
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
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

export default UserSignIn;
