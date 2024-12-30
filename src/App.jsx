import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.css";
import SiteNavigator from "./components/SiteNav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Base from "./pages/Base";
import Users from "./pages/Users";
import { AuthProvider } from "./components/AuthProvider";
import ProtectedLayout from "./layouts/ProtectedLayout";

function Logout() {
  // clears tokens
  localStorage.clear();

  return <Navigate to="/" />;
}

function RegisterAndLogout() {
  // clear so that we don't return old access tokens, prevents functionality errors
  localStorage.clear();

  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <header>
        <SiteNavigator />
      </header>
      <div className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={<Base />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/logout"
            element={<Logout />}
          />
          <Route
            path="/register"
            element={<RegisterAndLogout />}
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <AuthProvider>
                <ProtectedLayout />
              </AuthProvider>
            }>
            <Route
              path="users/*"
              element={<Users />}
            />
            <Route
              path="home"
              element={<Home />}
            />
          </Route>

          {/* Catch-All Route */}
          <Route
            path="/*"
            element={<NotFound />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
