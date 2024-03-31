// IMPORT REACT MODULES:
import React from "react";
import ReactDOM from "react-dom/client";

// IMPORT CSS (css reset):
import "./index.css";

// IMPORT (APP) COMPONENT:
import App from "./App";

// IMPORT (USER) CONTEXT:
import { UserProvider } from "./context/UserContext";

// CREATE ROOT & RENDER APP IN ROOT:
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // Wrap App with UserProvider to give all components access to User Context
    <UserProvider>
        <App />
    </UserProvider>
);
