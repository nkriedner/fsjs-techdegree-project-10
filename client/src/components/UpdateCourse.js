import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const UpdateCourse = () => {
    // create state for course data
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

    // Handle changes in the input & textarea values
    const handleChange = (e) => {
        // destructure the name and value from the input
        const { name, value } = e.target;
        // set the updated course data in state
        setCourse({
            ...course,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Updated course data:", course);

        // TODO -> Update form data
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
                                    onChange={handleChange}
                                />

                                <p>By Joe Smith</p>

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea
                                    id="courseDescription"
                                    name="description"
                                    defaultValue={course.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input
                                    id="estimatedTime"
                                    type="text"
                                    name="estimatedTime"
                                    defaultValue={course.estimatedTime}
                                    onChange={handleChange}
                                />

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea
                                    id="materialsNeeded"
                                    name="materialsNeeded"
                                    defaultValue={course.materialsNeeded}
                                    onChange={handleChange}
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
