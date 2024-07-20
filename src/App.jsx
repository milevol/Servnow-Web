import { Route, Routes } from "react-router";
import AnswerEndPage from "./pages/AnswerEndPage";
import AnswerPage from "./pages/AnswerPage";
import SignUpToggle from "./pages/SignUpToggle";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/answerend" element={<AnswerEndPage />} />
      <Route path="/answer" element={<AnswerPage />} />
      <Route path="/signup" element={<SignUpToggle />} />
    </Routes>
  );
}

export default App;
