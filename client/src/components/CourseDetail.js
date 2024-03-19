import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CourseDetail = () => {
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
    }, []);

    return (
        <main>
            {course && (
                <>
                    <div className="actions--bar">
                        <div className="wrap">
                            <Link className="button" to={`/courses/${course.id}/update`}>
                                Update Course
                            </Link>
                            <Link className="button" to="/">
                                Delete Course
                            </Link>
                            <Link className="button button-secondary" to="/">
                                Return to List
                            </Link>
                        </div>
                    </div>
                    <div className="wrap">
                        <h2>Course Detail</h2>
                        <form>
                            <div className="main--flex">
                                <div>
                                    <h3 className="course--detail--title">Course</h3>
                                    <h4 className="course--name">{course.title}</h4>
                                    <p>
                                        By {course.user.firstName} {course.user.lastName}
                                    </p>

                                    {/* render each line of the course description as a <p> tag */}
                                    {course.description.split("\n\n").map((line, index) => (
                                        <p key={index}>{line}</p>
                                    ))}
                                </div>
                                <div>
                                    <h3 className="course--detail--title">Estimated Time</h3>
                                    <p>{course.estimatedTime}</p>

                                    <h3 className="course--detail--title">Materials Needed</h3>
                                    <ul className="course--detail--list">
                                        {/* render each line of the course.materialsNeeded in a <li> tag (if data exists) */}
                                        {course.materialsNeeded &&
                                            course.materialsNeeded
                                                .split("* ")
                                                .filter((item) => item.trim() !== "")
                                                .map((item, index) => <li key={index}>{item.trim()}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </main>
    );
};

export default CourseDetail;
