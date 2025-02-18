import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
const Backend_Url = import.meta.env.VITE_BACKEND_URL;


// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to verify the token with the backend
  const verifyToken = async () => {
    const token = localStorage.getItem("Token"); // Retrieve the token from localStorage
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await fetch(`${Backend_Url}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in the Authorization header
        },
      });

      if (response.ok) {
        setIsAuthenticated(true); // Token is valid
        localStorage.setItem("isAuthenticated", 'true'); // Persist authenticated status
      } else {
        setIsAuthenticated(false); // Token is invalid
        localStorage.removeItem("Token"); // Remove invalid token
        localStorage.setItem("isAuthenticated", 'false'); // Set as not authenticated
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      setIsAuthenticated(false);
      localStorage.setItem("isAuthenticated", 'false'); // In case of error
    }
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem("Token"); // Remove the token from localStorage
    setIsAuthenticated(false); // Update authentication state
    localStorage.setItem("isAuthenticated", 'false'); // Update the status in localStorage
    toast.success("Logout Successful!");
  };

  // Verify the token when the app starts or refreshes
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem("isAuthenticated");
    if (storedAuthStatus === 'true') {
      setIsAuthenticated(true); // If the status is stored as true, maintain authentication
      verifyToken(); // Call verifyToken if it's already marked as authenticated
    } else {
      setIsAuthenticated(false); // If not authenticated, stay unauthenticated
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
