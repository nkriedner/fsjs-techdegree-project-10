// IMPORT REACT MODULES:
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// STATEFUL FUNCTIONAL COURSES COMPONENT:
const Courses = () => {
    // invoke useNavigate hook to navigate programmatically
    const navigate = useNavigate();
    // create state for courses data
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        // FUNCTION FOR FETCHING COURSES DATA:
        const fetchCourses = async () => {
            try {
                // fetch courses data from the api
                // console.log("Fetching courses data from api...");
                const response = await fetch("http://localhost:5000/api/courses");
                // console.log("response.status:", response.status);

                // check the status of the fetch response
                if (response.status === 200) {
                    // (200 = OK status)

                    // parse the json data into an array of objects
                    const responseJson = await response.json();
                    // console.log("responseJson:", responseJson);

                    // set state for courses data
                    setCourses(responseJson);
                } else if (response.status === 404) {
                    // (404 = page not found)

                    // forward to /notfound route
                    navigate("/notfound");
                } else if (response.status === 500) {
                    // (500 = internal sever error)

                    // forward to /error route
                    navigate("/error");
                } else {
                    // (for all other errors)
                    throw new Error();
                }
            } catch (error) {
                console.log("Error when fetching courses data from api:", error);
                // forward to /error route
                navigate("/error");
            }
        };

        fetchCourses();
    }, [navigate]);

    return (
        <main>
            <div className="wrap main--grid">
                {/* Show courses once they are fetched from api */}
                {courses &&
                    courses.map((course) => {
                        return (
                            <Link key={course.id} className="course--module course--link" to={`courses/${course.id}`}>
                                <h2 className="course--label">Course</h2>
                                <h3 className="course--title">{course.title}</h3>
                            </Link>
                        );
                    })}

                <Link className="course--module course--add--module" to="courses/create">
                    <span className="course--add--title">
                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 13 13"
                            className="add"
                        >
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>
                        New Course
                    </span>
                </Link>
            </div>
        </main>
    );
};

// EXPORT COURSES COMPONENT:
export default Courses;
