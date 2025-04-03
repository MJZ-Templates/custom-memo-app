import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Button } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../apis/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rememberMe) {
      localStorage.setItem("savedEmail", email);
      localStorage.setItem("savedPassword", password);
    } else {
      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
    }

    try {
      const response = await login({ email, password });

      const token = response?.data?.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
      }

      navigate("/memo");
    } catch (error) {
      alert(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <LoginPageWrapper>
      <GradientCircle />
      <LoginPageContainer>
        <FormCard>
          <Title>Login</Title>
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
                Login
              </Button>
            </ButtonWrapper>
          </form>

          <SignUpPrompt>
            Don’t have an account?
            <Link to="/signup">Sign up</Link>
          </SignUpPrompt>
        </FormCard>
      </LoginPageContainer>
    </LoginPageWrapper>
  );
};

export default LoginPage;

const LoginPageWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: #f4f8ff;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const GradientCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  width: 1000px;
  height: 1000px;
  border-radius: 50%;
  opacity: 0.6;
  background: radial-gradient(
    circle,
    rgba(29, 108, 224, 0.4) 0%,
    rgba(68, 142, 254, 0.2) 40%,
    rgba(80, 148, 250, 0.05) 100%
  );
  filter: blur(80px);
  transform: translate(-50%, -50%);
`;

const LoginPageContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 960px;
  gap: 20px;
  z-index: 1;
`;

const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8fbff;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(2px);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
`;

const FormGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0;
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
  font-size: 14px;
  font-weight: 500;
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

const SignUpPrompt = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #2b2d36;
  cursor: pointer;

  a {
    margin-left: 6px;
    color: #448efe;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
