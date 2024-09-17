import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
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
