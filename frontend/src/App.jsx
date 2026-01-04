import { Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import VerifyOtp from "./pages/VerifyOtp";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/email-verification" element={<EmailVerificationPage />} />
    </Routes>
  );
}

export default App;
