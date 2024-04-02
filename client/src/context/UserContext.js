// IMPORT REACT MODULES:
import { createContext, useState } from "react";
import Cookies from "js-cookie";

// CREATE USER CONTEXT:
const UserContext = createContext(null);

// CREATE AND EXPORT USER PROVIDER:
export const UserProvider = (props) => {
    // Retrieve the user value from browser cookies
    const cookie = Cookies.get("authenticatedUser");
    // If there is a cookie -> use it for the state of authUser
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

    // function for signing in a user
    const signIn = async (credentials) => {
        // encode user email and password into Base64 format for HTTP Basic Authentication
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

        // define the option parameters for the following fetch request
        const fetchOptions = {
            method: "GET",
            headers: {
                Authorization: `Basic ${encodedCredentials}`,
            },
        };

        // fetch request to get user data
        const response = await fetch("http://localhost:5000/api/users", fetchOptions);

        // check the response status of the fetch request
        if (response.status === 200) {
            // (200 = ok status)

            // parse the json data
            const user = await response.json();
            // set the user password to the password from the credentials
            user.password = credentials.password;
            // set the authenticated user state
            setAuthUser(user);
            // set the browser cookie for the authenticated user
            Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
            return user;
        } else if (response.status === 401) {
            // (401 = unauthorized)

            return null;
        } else {
            throw new Error();
        }
    };

    // function for signing out a user
    const signOut = () => {
        // reset authUser state
        setAuthUser(null);
        // reset cookies
        Cookies.remove("authenticatedUser");
    };

    return (
        <UserContext.Provider
            value={{
                authUser,
                actions: {
                    signIn,
                    signOut,
                },
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

// EXPORT USER CONTEXT:
export default UserContext;
