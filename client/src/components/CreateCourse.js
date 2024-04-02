// IMPORT REACT MODULES:
import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

// IMPORT (USER) CONTEXT:
import UserContext from "../context/UserContext";

// STATEFUL FUNCTIONAL CREATE COURSE COMPONENT:
const CreateCourse = () => {
    // access the user data from context
    const { authUser } = useContext(UserContext);
    // invoke useNavigate hook to navigate programmatically
    const navigate = useNavigate();
    // access form data with useRef hooks
    const courseTitle = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);
    // create state for form data & errors
    const [errors, setErrors] = useState([]);

    // HANDLE FORM SUBMISSION FOR CREATING A NEW COURSE:
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents the default behavior of form submissions

        // set data for new course
        const newCourse = {
            userId: authUser.id,
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
        };

        // encode user email and password into Base64 format for HTTP Basic Authentication
        const encodedCredentials = btoa(`${authUser.emailAddress}:${authUser.password}`);

        // define the option parameters for the following fetch request
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify(newCourse),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Basic ${encodedCredentials}`,
            },
        };

        try {
            // post new course data to api
            // console.log("Posting new course data to api...");
            const response = await fetch("http://localhost:5000/api/courses", fetchOptions);
            // console.log("response.status:", response.status);

            // check the status of the post fetch response
            if (response.status === 201) {
                // (201 = OK status for post requests)

                // forward to home route
                navigate("/");
            } else if (response.status === 500) {
                // (500 = internal sever error)

                // forward to /error route
                navigate("/error");
            } else if (response.status === 400) {
                // (400 = Bad request / validation error)

                // parse the json data into an array of objects
                const responseJson = await response.json();
                // display the validation errors by setting the errors state
                setErrors(responseJson.errors);
            } else if (response.status === 404) {
                // (404 = page not found)

                // forward to /notfound route
                navigate("/notfound");
            } else {
                // (for all other errors)
                throw new Error();
            }
        } catch (error) {
            console.log("Error when posting new course data to api:", error);
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
            <div className="wrap">
                <h2>Create Course</h2>

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

                {/* Form fields for creating a new course */}
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref={courseTitle} />

                            <p>
                                By {authUser.firstName} {authUser.lastName}
                            </p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea
                                id="courseDescription"
                                name="courseDescription"
                                ref={courseDescription}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">
                        Create Course
                    </button>
                    <button className="button button-secondary" onClick={handleCancel}>
                        Cancel
                    </button>
                </form>
            </div>
        </main>
    );
};

// EXPORT CREATE COURSE COMPONENT:
export default CreateCourse;
