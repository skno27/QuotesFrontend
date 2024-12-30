import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      setUserId(null);
      setLoading(true);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Math.floor(Date.now() / 1000);

      if (tokenExpiration > now) {
        setIsAuthorized(true);
        setUserId(decoded.id);
      } else {
        setIsAuthorized(false);
        setUserId(null);
      }
    } catch (error) {
      setIsAuthorized(false);
      setUserId(null);
    }
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <AuthContext.Provider value={{ isAuthorized, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
