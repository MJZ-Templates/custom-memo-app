import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
`;

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
    <HomePageContainer>
      <h1>HomePage</h1>
      <Button onClick={handleGoToMemo}>Go to My Memo Space</Button>
    </HomePageContainer>
  );
};

export default HomePage;
