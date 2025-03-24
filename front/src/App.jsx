import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MemoListPage from "./pages/MemoListPage";
import MemoCreatePage from "./pages/MemoCreatePage";
import MemoEditPage from "./pages/MemoEditPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/memo" element={<MemoListPage />} />
      <Route path="/memo/new" element={<MemoCreatePage />} />
      <Route path="/memo/edit/:id" element={<MemoEditPage />} />
    </Routes>
  );
}

export default App;
