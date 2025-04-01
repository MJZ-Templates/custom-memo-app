import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MemoListPage from "./pages/MemoListPage";
import HomePage from "./pages/HomePage";
import styled from "@emotion/styled";

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  background-color: #f7f7fa;
`;

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/memo" element={<MemoListPage />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
