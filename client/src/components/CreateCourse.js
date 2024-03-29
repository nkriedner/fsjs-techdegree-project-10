import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const CreateCourse = () => {
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();
    // Set state for form data & errors
    const courseTitle = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);
    const [errors, setErrors] = useState([]);

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

        const fetchOptions = {
            method: "POST",
            body: JSON.stringify(newCourse),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Basic ${encodedCredentials}`,
            },
        };

        try {
            // POST the new course
            const response = await fetch("http://localhost:5000/api/courses", fetchOptions);

            console.log("New course - response.status:", response.status);

            if (response.status === 201) {
                navigate("/");
            } else if (response.status === 500) {
                navigate("/error");
            } else if (response.status === 400) {
                const responseJson = await response.json();
                setErrors(responseJson.errors);
            } else if (response.status === 404) {
                navigate("/notfound");
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
                    <button className="button button-secondary" onClick={handleCancel}>
                        Cancel
                    </button>
                </form>
            </div>
        </main>
    );
};

export default CreateCourse;
