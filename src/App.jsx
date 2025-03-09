import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './Authcontext';
import Navbar from './Pages/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import AddPlayer from './Pages/AddPlayer';
import AddTeam from './Pages/AddTeam';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './Pages/Homepage';
import Teamplayers from './Pages/Teamplayers';
import UploadFolder from './Pages/UploadImages';
const AppLayout = () => {
  return (
    <>
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="mt-[9vh]">
        <Outlet />
      </div>
    </>
  );
};


const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // Save the current URL in localStorage before redirecting
      localStorage.setItem('redirectAfterLogin', location.pathname);
      console.log('Not authenticated. Redirecting to login...');
    } else {
      console.log('Authenticated. Access granted.');
    }
  }, [isAuthenticated, location]);

  // Retrieve the saved URL after login
  const redirectAfterLogin = localStorage.getItem('redirectAfterLogin') || '/';
  console.log("Redirect after login:",redirectAfterLogin);

  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={redirectAfterLogin == "/login" ? "/" : redirectAfterLogin} replace />
          ) : (
            <Login />
          )
        }
      />

      {/* Protected Routes */}
      {isAuthenticated ? (
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/player" element={<AddPlayer />} />
          <Route path="/teams" element={<AddTeam />} />
          <Route path="/auction" element={<HomePage />} />
          <Route path="/teams/:id" element={<Teamplayers />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <AppRoutes />
      </Router>
       {/* <UploadFolder/> */}
    </>
  );
};

export default App;

