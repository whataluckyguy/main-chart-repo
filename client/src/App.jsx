import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import LinkedInRedirect from "./LinkedInRedirect";
import LinkedInCallback from "./Components/LinkedInCallback";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/linkedin-callback" Component={LinkedInCallback} />

        <Route
          path="*"
          element={
            <h1
              style={{
                height: "100vh",
                display: "grid",
                placeItems: "center",
              }}
            >
              Page Not Found!
            </h1>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
