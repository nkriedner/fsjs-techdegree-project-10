import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

// Import components
import Header from "./components/Header";

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
            <Header />

            {courses && console.log("courses:", courses)}

            {/* when there are courses -> present the title of the courses */}
            {courses && courses.map((course) => <p key={course.id}>{course.title}</p>)}
        </div>
    );
}

export default App;
