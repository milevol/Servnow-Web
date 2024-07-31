import { Route, Routes } from "react-router";
import SignUpPage from "./pages/signup/SignUpPage";
import AnswerEndPage from "./pages/AnswerEndPage";
import LoginPage from "./pages/LoginPage";
import FindIdPage from "./pages/FindIdPage";
import FindPasswordPage from "./pages/FindPasswordPage";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/answerend" element={<AnswerEndPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/find-id" element={<FindIdPage />} />
      <Route path="/find-pswd" element={<FindPasswordPage />} />
      
    </Routes>
  );
}

export default App;
