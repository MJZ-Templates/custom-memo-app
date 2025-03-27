import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Button } from "../components";
import { Link } from "react-router-dom";

const SignUpPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  max-width: 960px;
  gap: 20px;
`;

const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 30px;
  border: 1px solid #e1e1e8;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  gap: 30px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
`;

const FormGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const FormLabel = styled.label`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 80px;
  color: #2b2d36;
  font-weight: 500;
  font-size: 14px;
`;

const FormInput = styled.input`
  width: 280px;
  padding: 12px;
  border: 1px solid #e1e1e8;
  border-radius: 8px;
  color: #213547;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #448efe;
    box-shadow: 0 0 0 2px rgba(68, 142, 254, 0.2);
  }
`;

const CheckboxWrapper = styled.label`
  display: flex;
  justify-content: center;
  gap: 4px;
  font-size: 14px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 10px;
`;

const CancelLinkButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  padding: 10px 16px;
  border: 1px solid transparent;
  border-radius: 8px;
  background-color: #6c6e7e14;
  color: #525463;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;

  &:hover,
  &:visited,
  &:active {
    color: #525463;
    text-decoration: none;
  }
`;

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem("savedEmail", email);
      localStorage.setItem("savedPassword", password);
    } else {
      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
    }

    alert("Sign up complete!");
  };

  return (
    <SignUpPageContainer>
      <FormCard>
        <Title>Sign Up</Title>
        <form onSubmit={handleSubmit}>
          <FormGroupWrapper>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Password</FormLabel>
              <FormInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </FormGroup>
            <CheckboxWrapper>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Email/Password
            </CheckboxWrapper>
          </FormGroupWrapper>

          <ButtonWrapper>
            <CancelLinkButton to="/">Cancel</CancelLinkButton>

            <Button
              type="submit"
              style={{
                width: "120px",
                fontWeight: 600,
              }}
            >
              Sign Up
            </Button>
          </ButtonWrapper>
        </form>
      </FormCard>
    </SignUpPageContainer>
  );
};

export default SignUpPage;
