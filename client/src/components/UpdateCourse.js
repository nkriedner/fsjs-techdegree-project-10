import { useEffect, useState, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const UpdateCourse = () => {
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();

    // create state for course data
    const courseTitle = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);
    const [course, setCourse] = useState(null);

    // Access the parameters from the URL
    let { id } = useParams();

    useEffect(() => {
        const fetchCourse = async () => {
            // fetch courses data from the api with id
            const response = await fetch("http://localhost:5000/api/courses/" + id);
            // parse the json data into an array of objects
            const json = await response.json();

            // check if the data is ok
            if (response.ok) {
                setCourse(json);
            }
        };

        fetchCourse();
    });

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedCourse = {
            userId: authUser.id,
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
        };

        const encodedCredentials = btoa(`${authUser.emailAddress}:${authUser.password}`);

        // Update the new course
        const response = await fetch("http://localhost:5000/api/courses/" + id, {
            method: "PUT",
            body: JSON.stringify(updatedCourse),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${encodedCredentials}`,
            },
        });

        const json = await response.json;

        console.log("Updated course data:", json);

        navigate(`/courses/${id}`);
    };

    return (
        <main>
            {/* Show the update course content when course data is loaded */}
            {course && (
                <div className="wrap">
                    <h2>Update Course</h2>
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
                        <Link to={`/courses/${id}`}>
                            <button className="button button-secondary">Cancel</button>
                        </Link>
                    </form>
                </div>
            )}
        </main>
    );
};

export default UpdateCourse;
