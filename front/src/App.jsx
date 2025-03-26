import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MemoListPage from "./pages/MemoListPage";
import styled from "@emotion/styled";

const AppContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 30px 14px;
  box-sizing: border-box;
`;

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/memo" element={<MemoListPage />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
