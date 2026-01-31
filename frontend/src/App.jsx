import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Landing from "./pages/static/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";
import EmailSent from "./pages/auth/EmailSent";
import About from "./pages/static/About";
import ContactUs from "./pages/static/ContactUs";
import CommunityGuidelines from "./pages/static/CommunityGuidelines";
import Problems from "./pages/problem/Problems";
import ProblemSolving from "./pages/problem/ProblemSolving";
import SubmissionResult from "./pages/problem/SubmissionResult";
import NotFound from "./pages/static/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/email-sent" element={<EmailSent />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/guidelines" element={<CommunityGuidelines />} />

          {/* Protected Routes */}
          <Route
            path="/problems"
            element={
              <ProtectedRoute>
                <Problems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/problem/:id"
            element={
              <ProtectedRoute>
                <ProblemSolving />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submission/:id"
            element={
              <ProtectedRoute>
                <SubmissionResult />
              </ProtectedRoute>
            }
          />

          {/* 404 Not Found - must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}