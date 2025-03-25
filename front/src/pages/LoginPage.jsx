import styled from "@emotion/styled";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  gap: 30px;
  background-color: #f7f7fa;
`;

const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 30px;
  border: 1px solid #e1e1e8;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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
  color: #213547;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #448efe;
    box-shadow: 0 0 0 2px rgba(68, 142, 254, 0.2);
  }
`;

const SignUpText = styled.p`
  margin: 0;
  font-size: 14px;
  text-align: center;
  color: #6c6e7e;
`;

const SignUpLink = styled(Link)`
  font-weight: 500;
  color: #448efe;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:visited {
    color: #448efe;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const LoginPage = () => {
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
          <SignUpText>
            Don’t have an account? <SignUpLink to="/signup">Sign up</SignUpLink>
          </SignUpText>
        </FormGroupWrapper>

        <ButtonWrapper>
          <Button style={{ width: "200px", fontWeight: 600 }}>Login</Button>
        </ButtonWrapper>
      </FormCard>
    </LoginPageContainer>
  );
};

export default LoginPage;
