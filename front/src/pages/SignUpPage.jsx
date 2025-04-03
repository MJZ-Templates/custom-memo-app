import { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { checkEmailDuplicate, register } from "../apis/auth";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailVerified) {
      alert("Please verify your email before signing up.");
      return;
    }

    try {
      await register({ name, email, password });
      alert("Sign up successful! Please log in.");
      navigate("/login");
    } catch (error) {
      alert(
        "Sign up failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <SignUpPageWrapper>
      <GradientCircle />
      <SignUpPageContainer>
        <FormCard>
          <Title>Sign Up</Title>
          <form onSubmit={handleSubmit}>
            <FormGroupWrapper>
              <FormGroup>
                <FormLabel>Name*</FormLabel>
                <FormInput
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Email*</FormLabel>
                <div style={{ display: "flex", gap: "8px" }}>
                  <FormInput
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsEmailVerified(false);
                    }}
                    placeholder="Enter your email"
                    required
                  />
                  <Button
                    type="button"
                    onClick={async () => {
                      try {
                        const res = await checkEmailDuplicate(email);
                        if (res.success && res.data?.isSuccess) {
                          alert("This email is available!");
                          setIsEmailVerified(true);
                        } else {
                          alert("This email is already taken.");
                          setIsEmailVerified(false);
                        }
                      } catch (error) {
                        alert(
                          "Failed to verify email: " +
                            (error.response?.data?.message || error.message)
                        );
                      }
                    }}
                  >
                    Verify
                  </Button>
                </div>
              </FormGroup>
              <FormGroup>
                <FormLabel>Password*</FormLabel>
                <FormInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </FormGroup>
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
    </SignUpPageWrapper>
  );
};

export default SignUpPage;

const SignUpPageWrapper = styled.div`
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

const SignUpPageContainer = styled.div`
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
