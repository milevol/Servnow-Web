import { Route, Routes } from "react-router";
import SignUpPage from "./pages/signup/SignUpPage";
import AnswerEndPage from "./pages/AnswerEndPage";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/answerend" element={<AnswerEndPage />} />
    </Routes>
  );
}

export default App;
