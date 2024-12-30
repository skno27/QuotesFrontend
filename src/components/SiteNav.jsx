import { Link, useLocation } from "react-router-dom";
import "../styles/SiteNav.css";
import { ACCESS_TOKEN } from "../constants";
const SiteNavigator = () => {
  const location = useLocation();
  const pathname = location.pathname;

  if (pathname.includes("login")) {
    console.log("Login Page");
    return (
      <nav
        id="site-navigator"
        className="nav-links"
        style={{ backgroundColor: "var(--gr)" }}>
        <Link to="/register">Register</Link>
      </nav>
    );
  } else if (pathname.includes("users")) {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      console.log("Users Page -- Logged In");
      return (
        <nav
          id="site-navigator"
          className="nav-links"
          style={{ backgroundColor: "var(--gr)" }}>
          <Link to="/home">Home</Link>
          <Link to="/logout">Logout</Link>
        </nav>
      );
    } else {
      // console.log("Users Page -- Not Logged In");
      return (
        <nav
          id="site-navigator"
          className="nav-links"
          style={{ backgroundColor: "var(--gr)" }}>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      );
    }
  } else if (pathname.includes("register")) {
    return (
      <nav
        id="site-navigator"
        className="nav-links"
        style={{ backgroundColor: "var(--gr)" }}>
        <Link to="/login">Login</Link>
      </nav>
    );
  } else if (pathname.includes("home")) {
    return (
      <nav
        id="site-navigator"
        className="nav-links"
        style={{ backgroundColor: "var(--gr)" }}>
        <Link to="/users">Users</Link>
        <Link to="/logout">Logout</Link>
      </nav>
    );
  }
};

export default SiteNavigator;
