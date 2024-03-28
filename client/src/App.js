import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Import components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";
import NotFound from "./components/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Courses />} />
                <Route path="courses/create" element={<CreateCourse />} />
                <Route path="courses/:id" element={<CourseDetail />} />
                <Route path="courses/:id/update" element={<UpdateCourse />} />
                <Route path="signin" element={<UserSignIn />} />
                <Route path="signup" element={<UserSignUp />} />
                <Route path="signout" element={<UserSignOut />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
