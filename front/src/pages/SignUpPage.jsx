import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Button from "../components/Button";

const SignUpPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 30px;
  border: 1px solid #e1e1e8;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  background-color: #fff;
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
  justify-content: center;
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
  color: #6c6e7e;
  font-size: 14px;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 10px;
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

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setRememberMe(false);
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
              Remember email/password
            </CheckboxWrapper>
          </FormGroupWrapper>

          <ButtonWrapper>
            <Button type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Sign Up</Button>
          </ButtonWrapper>
        </form>
      </FormCard>
    </SignUpPageContainer>
  );
};

export default SignUpPage;
