import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SignIn = () => {
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

        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

        const fetchOptions = {
            method: "GET",
            headers: {
                Authorization: `Basic ${encodedCredentials}`,
            },
        };

        try {
            const response = await fetch("http://localhost:5000/api/users", fetchOptions);

            if (response.status === 200) {
                const user = await response.json();
                console.log(`SUCCESS! ${user.firstName} ${user.lastName} is now signed in!`);
                // console.log(user);
                navigate("/");
            } else if (response.status === 401) {
                setErrors(["Sign-in was unsucessful"]);
            } else {
                throw new Error();
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

export default SignIn;
