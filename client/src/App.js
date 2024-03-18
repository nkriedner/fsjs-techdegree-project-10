import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Import components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Courses />} />
                <Route path="/courses/create" element={<CreateCourse />} />
            </Routes>

            {/* when there are courses -> present the title of the courses */}
            {/* {courses && courses.map((course) => <p key={course.id}>{course.title}</p>)} */}
        </BrowserRouter>
    );
}

export default App;
