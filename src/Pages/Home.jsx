import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  height: 91vh;
  position: relative;
  // border:30px solid #ff00ff;
`;

const Background = styled.div`
  position: absolute;
  inset: 0;
  background-image: url('bg.avif');
  background-size: cover;
  background-position: center;
  z-index: -1;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom right, black, rgba(255, 0, 255, 0.5), black);
    opacity: 0.8;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  height: 88vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const TextCenter = styled.div`
  text-align: center;
  padding: 0 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 2rem;
  letter-spacing: -1px;
  span {
    display: block;
    color: #ff00ff;
    margin-top: 0.5rem;
  }

  @media (min-width: 768px) {
    font-size: 2rem;
  }

  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #d3d3d3;
  margin-bottom: 2rem;
  max-width: 30rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const NeonButton = styled.button`
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  color: #fff;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  width: 10rem;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #00ffff, #ff00ff);
  }

  @media (max-width: 768px) {
    width: 8rem;
    padding: 0.5rem 1rem;
  }

  @media (max-width: 480px) {
    width: 6rem;
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    top: 2px;
    right: 0;
  }
`;

function Home() {
  const navigate = useNavigate();

  const handleClick = () =>{
    localStorage.setItem("auction",true);
    navigate('/auction');
  }

  return (
    <Container>
      <Background />
      <Content>
        <TextCenter>
          <Title>
            TeckziteIplAuction
            <span>2025</span>
          </Title>
          <Subtitle>
            Where cricketing legends are made and dreams take flight
          </Subtitle>
          <NeonButton onClick={handleClick}>
            startAuction
          </NeonButton>
        </TextCenter>
      </Content>
    </Container>
  );
}

export default Home;
