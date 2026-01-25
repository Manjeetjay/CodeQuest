import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Landing from "./pages/static/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import About from "./pages/static/About";
import ContactUs from "./pages/static/ContactUs";
import CommunityGuidelines from "./pages/static/CommunityGuidelines";
import Problems from "./pages/Problems";
import ProblemSolving from "./pages/ProblemSolving";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}