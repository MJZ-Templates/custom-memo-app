import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGoToMemo = () => {
    const token = localStorage.getItem("accessToken");

    if (
      token &&
      token !== "null" &&
      token !== "undefined" &&
      token.trim() !== ""
    ) {
      navigate("/memo");
    } else {
      navigate("/login");
    }
  };

  return (
    <HomePageWrapper>
      <GradientCircle />
      <Title>
        Your smart, personalized memo space
        <br />
        <strong>Start with Custom Memo App today</strong>
      </Title>
      <Description>
        Create, organize, and voice-record your memos with ease. <br />
        Sign up now to access advanced features like Kanban view and
        speech-to-text.
      </Description>
      <Button
        onClick={handleGoToMemo}
        style={{
          padding: "16px 32px",
          fontSize: "20px",
        }}
      >
        Go to My Memo Space
      </Button>
    </HomePageWrapper>
  );
};

export default HomePage;

const HomePageWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f4f8ff;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  color: #111;
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

const Title = styled.h1`
  text-align: center;
  z-index: 1;
  color: #1d1d1f;
  line-height: 1.4;
  font-size: 32px;
  font-weight: 400;

  strong {
    color: #1d6ce0;
    font-size: 38px;
    font-weight: 700;
  }
`;

const Description = styled.p`
  text-align: center;
  margin: 20px 0 40px;
  z-index: 1;
  color: #444;
  line-height: 1.6;
  font-size: 20px;
`;
