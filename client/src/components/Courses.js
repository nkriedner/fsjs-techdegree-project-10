import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
    // create state for courses data
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            // fetch courses data from the api
            const response = await fetch("http://localhost:5000/api/courses");
            // parse the json data into an array of objects
            const json = await response.json();

            // check if the data is ok
            if (response.ok) {
                setCourses(json);
            }
        };

        fetchCourses();
    }, []);

    return (
        <main>
            {/* {courses && console.log("courses:", courses)} */}

            <div className="wrap main--grid">
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

export default Courses;
