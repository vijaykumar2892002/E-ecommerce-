import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 300px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  display: block;
  margin-top: 10px;
  text-align: center;
  color: teal;
  text-decoration: none;
`;

const ForgotPassword = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Forgot Password</Title>
        <form>
          <Input type="email" placeholder="Enter your email" />
          <Button>Reset Password</Button>
        </form>
        <StyledLink to="/">Back to Home</StyledLink>
        <StyledLink to="/login">Login</StyledLink>
        <StyledLink to="/register">Create an account</StyledLink>
      </Wrapper>
    </Container>
  );
};

export default ForgotPassword;
