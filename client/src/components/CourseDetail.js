// IMPORT REACT MODULES:
import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import UserContext from "../context/UserContext";

// STATEFUL FUNCTIONAL COURSE DETAIL COMPONENT:
const CourseDetail = () => {
    // access the user data from context
    const { authUser } = useContext(UserContext);
    // invoke useNavigate hook to navigate programmatically
    const navigate = useNavigate();
    // create state for course data
    const [course, setCourse] = useState(null);
    // Access the parameters from the URL param
    let { id } = useParams();

    useEffect(() => {
        // FETCHING COURSE DETAIL DATA:
        const fetchCourse = async () => {
            try {
                // fetch course data from the api with id
                // console.log("Fetching course detail data from api...");
                const response = await fetch("http://localhost:5000/api/courses/" + id);
                // console.log("response.status:", response.status);

                // check the status of the fetch response
                if (response.status === 200) {
                    // 200 = OK status
                    // parse the json data into an array of objects
                    const responseJson = await response.json();
                    // console.log("responseJson:", responseJson);
                    // if no data exists redirect to /notfound
                    if (responseJson === null) {
                        navigate("/notfound");
                    }
                    // set state for course data
                    setCourse(responseJson);
                } else if (response.status === 404) {
                    // 404 = page not found
                    // forward to /notfound route
                    navigate("/notfound");
                } else if (response.status === 500) {
                    // 500 = internal sever error
                    // forward to /error route
                    navigate("/error");
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log("Error when fetching course detail data from api:", error);
                // forward to /error route
                navigate("/error");
            }
        };

        fetchCourse();
    }, [id, navigate]);

    // HANDLE 'DELETE COURSE' BUTTON CLICKS:
    const handleClick = async () => {
        const encodedCredentials = btoa(`${authUser.emailAddress}:${authUser.password}`);

        try {
            // send delete request to api
            console.log("Deleting course data from api...");
            const response = await fetch("http://localhost:5000/api/courses/" + id, {
                method: "DELETE",
                headers: {
                    Authorization: `Basic ${encodedCredentials}`,
                },
            });
            console.log("response.status:", response.status);

            // check the status of the delete response
            if (response.status === 204) {
                // 204 = successful delete request
                // forward to / route
                navigate("/");
            } else if (response.status === 403) {
                // 403 = unauthorized request
                // Forward to /forbidden
                navigate("/forbidden");
            } else if (response.status === 500) {
                // 500 = internal sever error
                // forward to /error route
                navigate("/error");
            }
        } catch (error) {
            console.log("Error when deleting course data:", error);
            // forward to /error route
            navigate("/error");
        }
    };

    return (
        <main>
            {course && (
                <>
                    <div className="actions--bar">
                        <div className="wrap">
                            {authUser && authUser.id === course.userId && (
                                <>
                                    <Link className="button" to={`/courses/${course.id}/update`}>
                                        Update Course
                                    </Link>
                                    <button className="button" to="/" onClick={handleClick}>
                                        Delete Course
                                    </button>
                                </>
                            )}
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

                                    <Markdown>{course.description}</Markdown>
                                </div>
                                <div>
                                    <h3 className="course--detail--title">Estimated Time</h3>
                                    <p>{course.estimatedTime}</p>

                                    <h3 className="course--detail--title">Materials Needed</h3>
                                    <ul className="course--detail--list">
                                        <Markdown>{course.materialsNeeded}</Markdown>
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

// EXPORT COURSE DETAIL COMPONENT:
export default CourseDetail;
