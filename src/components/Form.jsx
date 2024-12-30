import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./Loading.jsx";
import PropTypes from "prop-types";

Form.propTypes = {
  route: PropTypes.string.isRequired,
  method: PropTypes.oneOf(["login", "register"]).isRequired,
};

function Form({ route, method }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const formname = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    // prevents reloading the page
    e.preventDefault();

    setLoading(true);

    try {
      if (method === "login") {
        if (!username || !password) {
          alert("Username and password are required");
          return;
        }
        const res = await api.post(route, { username, password });
        if (!res || !res.data || !res.data.token) {
          throw new Error("Invalid response from server--");
        }
        localStorage.setItem(ACCESS_TOKEN, res.data.token);
        navigate("/home");
      } else {
        const result = await api.post(route, {
          name,
          username,
          password,
          email,
        });
        console.info(result);
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-container">
      <h1>{formname}</h1>
      {method === "register" && (
        <>
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </>
      )}
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="form-input"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <div className="visibility">
        <input
          id="passwordVisibility"
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        <span>Show Password</span>
      </div>
      {loading && <LoadingIndicator />}
      <button
        className="form-button"
        type="submit">
        {formname}
      </button>
    </form>
  );
}

export default Form;
