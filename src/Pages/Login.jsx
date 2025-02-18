import  { useState,useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../Authcontext"
const Backend_Url = import.meta.env.VITE_BACKEND_URL;


const Container = styled.div`
  background-color: #1a202c;
  color: white;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Card = styled.div`
  width: 100%;
  max-width: 24rem;
  padding: 1.5rem;
  background-color: #2d3748;
  border-radius: 0.5rem;
  border-bottom:2px solid #ff00ff;
  border-left:2px solid #ff00ff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const NeonText = styled.h1`
  color: #fff;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const NeonInput = styled.input`
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #000;
  padding: 0.625rem;
  border-radius: 0.3125rem;
  width: 100%;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #ff00ff;
    box-shadow: 0 0 10px #ff00ff;
  }
`;

const NeonButton = styled.button`
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  color: #fff;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.3125rem;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s ease;
  &:hover {
    background: linear-gradient(45deg, #00ffff, #ff00ff);
  }
`;

const Login = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated,verifyToken } = useAuth();

  useEffect(() => {
    console.log("UseEffect in login component");
    console.log("isAuthenticated",isAuthenticated);
    if (isAuthenticated) {
      console.log("Login component");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminId) {
      toast.warn("Please enter your Admin ID");
      console.log("Please enter your Id");
      return;
    }
    if (!password) {
      toast.warn("Please enter your password");
      return;
    }

    try {
      const response = await fetch(`${Backend_Url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminId, password }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Login Successful!");
        localStorage.setItem("Token", data.token);
        setAdminId("");
        setPassword("");
        verifyToken();
      } else if (response.status === 401) {
        toast.error("Invalid Admin ID or Password. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <>
      <Container>
        <Card>
          <NeonText as="h2">Admin Login</NeonText>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="adminId" className="block text-sm font-medium mb-2">
                Admin ID
              </label>
              <NeonInput
                type="text"
                id="adminId"
                name="adminId"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Enter your ID"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <NeonInput
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <NeonButton type="submit" >Login</NeonButton>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default Login;
