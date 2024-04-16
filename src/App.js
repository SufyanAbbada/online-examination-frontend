import SignUp from "./Authentication/SignUp";
import Login from "./Authentication/Login";
import VerificationSplash from "./Authentication/VerificationSplash";
import Admin from "./Authentication/Admin";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="App bg-blue-900 h-[100vh]">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<VerificationSplash />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
