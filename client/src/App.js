import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
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
        <div className="App">
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo">
                        {/* <Link to="/">Courses</Link> */}
                        <span>Courses</span>
                    </h1>
                    <nav>
                        <ul className="header--signedout">
                            <li>
                                {/* <Link to="sign-up.html">Sign Up</Link> */}
                                <span>Sign Up</span>
                            </li>
                            <li>
                                {/* <Link to="sign-in.html">Sign In</Link> */}
                                <span>Sign In</span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            {courses && console.log("courses:", courses)}

            {/* when there are courses -> present the title of the courses */}
            {courses && courses.map((course) => <p key={course.id}>{course.title}</p>)}
        </div>
    );
}

export default App;
