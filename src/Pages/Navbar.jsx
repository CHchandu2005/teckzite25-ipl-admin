import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BiMenu } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useAuth } from '../Authcontext';

const NavbarContainer = styled.nav`
  background-color: rgb(37, 44, 59);
  color: white;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.3rem;
  position: relative;
  z-index: 10;
  border-bottom: 2px solid #ff00ff;
  height:9vh;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 0 2px #ffffff, 0 0 4px #ffffff, 0 0 8px #ff00ff;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
        font-size: 1.6rem;

  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  margin-left: 2rem;
`;

const NavLink = styled(Link)`
  position: relative;
  display: inline-block;
  padding: 0.5rem 1rem;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.7s ease;

  &::after {
    content: ''; 
    position: absolute;
    width: 0;
    height: 2px;
    display: block;
    margin-top: 5px;
    right: 0;
    background: #ff00ff;
    transition: width 0.3s ease, right 0.3s ease;
  }

  &:hover::after {
    width: 100%;
    right: 0;
  }
`;

const Sidebar = styled(({ isOpen, ...rest }) => <div {...rest} />)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: rgb(37, 44, 59);
  color: white;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 20;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.3rem;
  width: 100%;
  border-bottom: 2px solid #ff00ff;
`;

const SidebarTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff00ff;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  margin: 1rem 0 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const SidebarItem = styled.li`
  margin: 1rem 0;
`;

const SidebarLink = styled(Link)`
  position: relative;
  display: inline-block;
  padding: 0.5rem 1rem;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.7s ease;

  &::after {
    content: ''; 
    position: absolute;
    width: 0;
    height: 2px;
    display: block;
    margin-top: 5px;
    right: 0;
    background: #ff00ff;
    transition: width 0.3s ease, right 0.3s ease;
  }

  &:hover::after {
    width: 100%;
    right: 0;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
`;

const ModalContent = styled.div`
  background-color: #242636;
  color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 15px #ff00ff;
  text-align: center;
`;

const ModalButton = styled.button`
  background-color: #ff00ff;
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin: 0.5rem;

  &:hover {
    background-color: #ff4fff;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    logout();
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);  
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <NavbarContainer>
        <Logo>{isOpen ? 'TZ' : 'TeckziteIplAuction'}</Logo>
        <NavMenu>
          <NavItem><NavLink to="/">Home</NavLink></NavItem>
          <NavItem><NavLink to="/player">Players</NavLink></NavItem>
          <NavItem><NavLink to="/teams">Teams</NavLink></NavItem>
          <NavItem><NavLink onClick={handleLogoutClick}>Logout</NavLink></NavItem>
        </NavMenu>
        <Hamburger onClick={toggleMenu}>
          <BiMenu />
        </Hamburger>
      </NavbarContainer>
      <Sidebar isOpen={isOpen}>
        <SidebarHeader>
          <SidebarTitle><Logo>TZ</Logo></SidebarTitle>
          <CloseButton onClick={toggleMenu}>&times;</CloseButton>
        </SidebarHeader>
        <SidebarMenu>
          <SidebarItem><SidebarLink to="/" onClick={toggleMenu}>Home</SidebarLink></SidebarItem>
          <SidebarItem><SidebarLink to="/player" onClick={toggleMenu}>Players</SidebarLink></SidebarItem>
          <SidebarItem><SidebarLink to="/teams" onClick={toggleMenu}>Teams</SidebarLink></SidebarItem>
          <SidebarItem><SidebarLink onClick={handleLogoutClick}>Logout</SidebarLink></SidebarItem>
        </SidebarMenu>
      </Sidebar>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <p>Are you sure you want to log out?</p>
            <ModalButton onClick={handleConfirmLogout}>Yes</ModalButton>
            <ModalButton onClick={handleCancelLogout}>Cancel</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Navbar;
