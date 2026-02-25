import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy-loaded pages – each route is a separate chunk
const Landing = lazy(() => import("./pages/static/Landing"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const About = lazy(() => import("./pages/static/About"));
const ContactUs = lazy(() => import("./pages/static/ContactUs"));
const CommunityGuidelines = lazy(() => import("./pages/static/CommunityGuidelines"));
const Problems = lazy(() => import("./pages/problem/Problems"));
const ProblemSolving = lazy(() => import("./pages/problem/ProblemSolving"));
const SubmissionResult = lazy(() => import("./pages/problem/SubmissionResult"));
const NotFound = lazy(() => import("./pages/static/NotFound"));
const ServerStatus = lazy(() => import("./pages/static/ServerStatus"));
const Sitemap = lazy(() => import("./pages/static/Sitemap"));

// Minimal loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0b0f14] flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/guidelines" element={<CommunityGuidelines />} />
            <Route path="/server-status" element={<ServerStatus />} />
            <Route path="/sitemap" element={<Sitemap />} />

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
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
