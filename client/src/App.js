import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Import components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Courses />} />
                <Route path="/courses/create" element={<CreateCourse />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/courses/:id/update" element={<UpdateCourse />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
