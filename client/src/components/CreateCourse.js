import { useState } from "react";
import { Link } from "react-router-dom";

const CreateCourse = () => {
    // Set state for form data & errors
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    const [errors, setErrors] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCourse = { courseTitle, courseDescription, estimatedTime, materialsNeeded };

        // POST the new course
        const response = await fetch("http://localhost:5000/api/courses", {
            method: "POST",
            body: JSON.stringify(newCourse),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await response.json;

        // if there is a problem with the response
        if (!response.ok) {
            setErrors(json.error); // set the error received from the response
        }
        if (response.ok) {
            // reset the form fields and error values
            setCourseTitle("");
            setCourseDescription("");
            setEstimatedTime("");
            setMaterialsNeeded("");

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
                            <input
                                id="courseTitle"
                                type="text"
                                value={courseTitle}
                                onChange={(e) => setCourseTitle(e.target.value)}
                            />

                            <p>By (add logged in user name)</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea
                                id="courseDescription"
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input
                                id="estimatedTime"
                                type="text"
                                value={estimatedTime}
                                onChange={(e) => setEstimatedTime(e.target.value)}
                            />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea
                                id="materialsNeeded"
                                value={materialsNeeded}
                                onChange={(e) => setMaterialsNeeded(e.target.value)}
                            ></textarea>
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
