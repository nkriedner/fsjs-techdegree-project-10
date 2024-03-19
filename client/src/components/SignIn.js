import { NavLink } from "react-router-dom";

const SignIn = () => {
    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>

                <form>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" />
                    <button className="button" type="submit">
                        Sign In
                    </button>
                    <button className="button button-secondary">Cancel</button>
                </form>
                <p>
                    Don't have a user account? Click here to <NavLink href="/signup">sign up</NavLink>!
                </p>
            </div>
        </main>
    );
};

export default SignIn;
