import { Route, Routes } from "react-router";
import AnswerEndPage from "./pages/AnswerEndPage";
import AnswerPage from "./pages/AnswerPage";
import SignUpToggle from "./pages/SignUpToggle";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/answerend" element={<AnswerEndPage />} />
      <Route path="/answer" element={<AnswerPage />} />
      <Route path="/signup" element={<SignUpToggle />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
