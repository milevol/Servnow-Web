import { Route, Routes } from "react-router";
import SignUpPage from "./pages/signup/SignUpPage";
import AnswerEndPage from "./pages/AnswerEndPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/answerend" element={<AnswerEndPage />} />
      <Route path="/login" element={<LoginPage />} />
      
    </Routes>
  );
}

export default App;
