import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Button from "../components/Button";

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  gap: 30px;
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
`;

const FormInput = styled.input`
  width: 280px;
  padding: 12px;
  border: 1px solid #e1e1e8;
  border-radius: 8px;
  color: #6c6e7e;
  font-size: 14px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <LoginPageContainer>
      <FormCard>
        <Title>Login</Title>
        <FormGroupWrapper>
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormInput type="email" placeholder="Enter your email" />
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormInput type="password" placeholder="Enter your password" />
          </FormGroup>
        </FormGroupWrapper>

        <ButtonWrapper>
          <Button onClick={handleSignUp}>Sign Up</Button>
          <Button>Login</Button>
        </ButtonWrapper>
      </FormCard>
    </LoginPageContainer>
  );
};

export default LoginPage;
