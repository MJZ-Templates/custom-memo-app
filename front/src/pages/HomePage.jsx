import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGoToMemo = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/memo");
    } else {
      navigate("/login");
    }
  };

  return (
      <Wrapper>
        <GradientCircle />
        <Title>
          Your smart, personalized memo space
          <br />
          <strong>Start with Custom Memo App today</strong>
        </Title>
        <Description>
          Create, organize, and voice-record your memos with ease. <br />
          Sign up now to access advanced features like Kanban view and speech-to-text.
        </Description>
        <Button onClick={handleGoToMemo}>Go to My Memo Space</Button>
      </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #f4f8ff;
  color: #111;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GradientCircle = styled.div`
  position: absolute;
  width: 1000px;
  height: 1000px;
  border-radius: 50%;
  opacity: 0.6;
  filter: blur(80px);
  background: radial-gradient(
      circle,
      rgba(29, 108, 224, 0.4) 0%,
      rgba(68, 142, 254, 0.2) 40%,
      rgba(80, 148, 250, 0.05) 100%
  );
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 32px;
  font-weight: 400;
  line-height: 1.4;
  z-index: 1;
  color: #1d1d1f;

  strong {
    font-weight: 700;
    font-size: 38px;
    color: #1D6CE0;
  }
`;

const Description = styled.p`
  text-align: center;
  font-size: 20px;
  line-height: 1.6;
  margin-top: 20px;
  z-index: 1;
  color: #444;
`;
