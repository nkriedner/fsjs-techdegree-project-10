// IMPORT REACT MODULES:
import { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

// IMPORT (USER) CONTEXT:
import UserContext from "../context/UserContext";

// STATEFUL FUNCTIONAL UPDATE COURSE COMPONENT:
const UpdateCourse = () => {
    // access the user data from context
    const { authUser } = useContext(UserContext);
    // invoke useNavigate hook to navigate programmatically
    const navigate = useNavigate();

    // create state for course data
    const courseTitle = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);
    const [course, setCourse] = useState(null);
    const [errors, setErrors] = useState([]);

    // Access the parameters from the URL
    let { id } = useParams();

    useEffect(() => {
        // FUNCTION FOR FETCHING COURSE DETAIL DATA (to display in the update form):
        const fetchCourse = async () => {
            try {
                // fetch courses data from the api with id
                // console.log("Fetching course detail data from api for update form...");
                const response = await fetch("http://localhost:5000/api/courses/" + id);
                // console.log("response.status:", response.status);

                // check the status of the fetch response
                if (response.status === 200) {
                    // 200 = OK status
                    // parse the json data into an array of objects
                    const responseJson = await response.json();
                    // console.log("responseJson:", responseJson);
                    // check if authUser id is equal to course's userId
                    // console.log("responseJson.userId", responseJson.userId);
                    // console.log("authUser.id:", authUser.id);
                    if (authUser.id !== responseJson.userId) {
                        // navigate to forbidden route if they don't match
                        navigate("/forbidden");
                    }
                    // set state for course data
                    setCourse(responseJson);
                } else if (response.status === 404) {
                    // 404 = page not found
                    // forward to /notfound route
                    navigate("/notfound");
                } else if (response.status === 500) {
                    // 500 = internal sever error
                    // forward to /error route
                    navigate("/error");
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log("Error when fetching course detail data from api:", error);
                // forward to /error route
                navigate("/error");
            }
        };

        fetchCourse();
    }, [id, navigate, authUser.id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents the default behavior of form submissions

        const updatedCourse = {
            userId: authUser.id,
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
        };

        const encodedCredentials = btoa(`${authUser.emailAddress}:${authUser.password}`);

        const fetchOptions = {
            method: "PUT",
            body: JSON.stringify(updatedCourse),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Basic ${encodedCredentials}`,
            },
        };

        try {
            // Update the new course
            console.log("Updating course data...");
            const response = await fetch("http://localhost:5000/api/courses/" + id, fetchOptions);
            console.log("response.status:", response.status);

            if (response.status === 204) {
                navigate(`/courses/${id}`);
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
        e.preventDefault(); // prevents the default behavior of form submissions
        navigate(`/courses/${id}`);
    };

    return (
        <main>
            {/* Show the update course content when course data is loaded */}
            {course && (
                <div className="wrap">
                    <h2>Update Course</h2>

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
                                <input
                                    id="courseTitle"
                                    type="text"
                                    name="title"
                                    defaultValue={course.title}
                                    ref={courseTitle}
                                />

                                <p>By Joe Smith</p>

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea
                                    id="courseDescription"
                                    name="description"
                                    defaultValue={course.description}
                                    ref={courseDescription}
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input
                                    id="estimatedTime"
                                    type="text"
                                    name="estimatedTime"
                                    defaultValue={course.estimatedTime}
                                    ref={estimatedTime}
                                />

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea
                                    id="materialsNeeded"
                                    name="materialsNeeded"
                                    defaultValue={course.materialsNeeded}
                                    ref={materialsNeeded}
                                ></textarea>
                            </div>
                        </div>
                        <button className="button" type="submit">
                            Update Course
                        </button>
                        <button className="button button-secondary" onClick={handleCancel}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </main>
    );
};

// EXPORT UPDATE COURSE COMPONENT:
export default UpdateCourse;
