// IMPORT REACT MODULES:
import { BrowserRouter, Routes, Route } from "react-router-dom";

// IMPORT CSS:
import "./App.css";

// IMPORT COMPONENTS:
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import Forbidden from "./components/Forbidden";
import UnhandledError from "./components/UnhandledError";

// FUNCTIONAL APP COMPONENT:
function App() {
    return (
        // Wrap whole App with BrowserRouter to use routing founctionalities
        <BrowserRouter>
            <Header />
            <Routes>
                {/* Home route with courses overview */}
                <Route path="/" element={<Courses />} />

                {/* Course Detail route */}
                <Route path="courses/:id" element={<CourseDetail />} />

                {/* Registration routes */}
                <Route path="signin" element={<UserSignIn />} />
                <Route path="signup" element={<UserSignUp />} />
                <Route path="signout" element={<UserSignOut />} />

                {/* Protected Routes for registered users */}
                <Route element={<PrivateRoute />}>
                    <Route path="courses/create" element={<CreateCourse />} />
                    <Route path="courses/:id/update" element={<UpdateCourse />} />
                </Route>

                {/* Error routes */}
                <Route path="/forbidden" element={<Forbidden />} />
                <Route path="/error" element={<UnhandledError />} />
                <Route path="/noutfound" element={<NotFound />} />

                {/* NotFound route for all other not matching urls */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

// EXPORT APP COMPONENT:
export default App;
