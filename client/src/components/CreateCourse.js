import { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const CreateCourse = () => {
    const { authUser } = useContext(UserContext);
    // Set state for form data & errors
    const courseTitle = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);
    const [errors, setErrors] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCourse = {
            userId: authUser.id,
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
        };

        const encodedCredentials = btoa(`${authUser.emailAddress}:${authUser.password}`);

        // POST the new course
        const response = await fetch("http://localhost:5000/api/courses", {
            method: "POST",
            body: JSON.stringify(newCourse),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${encodedCredentials}`,
            },
        });

        const json = await response.json;

        // if there is a problem with the response
        if (!response.ok) {
            setErrors(json.error); // set the error received from the response
        }
        if (response.ok) {
            // reset the form fields and error values
            // setCourseTitle("");
            // setCourseDescription("");
            // setEstimatedTime("");
            // setMaterialsNeeded("");

            console.log("New course added:", json);
        }
    };

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>

                {/* Show Validation errors if there are any */}
                {errors && (
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            <li>Please provide a value for "Title"</li>
                            <li>Please provide a value for "Description"</li>
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" ref={courseTitle} />

                            <p>By (add logged in user name)</p>

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
                    <Link to="/">
                        <button className="button button-secondary">Cancel</button>
                    </Link>
                </form>
            </div>
        </main>
    );
};

export default CreateCourse;
