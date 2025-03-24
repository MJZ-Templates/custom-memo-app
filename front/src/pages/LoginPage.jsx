import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #d3d3d3;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin-top: 5px;
  border: none;
  background-color: #6c63ff;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  ::placeholder {
    color: white;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  width: 140px;
  padding: 10px;
  border: none;
  background-color: #6c63ff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <Container>
      <Title>Login</Title>
      <FormGroup>
        <label>Email</label>
        <Input type="email" placeholder="Enter your email" />
      </FormGroup>
      <FormGroup>
        <label>Password</label>
        <Input type="password" placeholder="Enter your password" />
      </FormGroup>
      <ButtonContainer>
        <Button onClick={handleSignUp}>Sign Up</Button>
        <Button>Login</Button>
      </ButtonContainer>
    </Container>
  );
};

export default LoginPage;
