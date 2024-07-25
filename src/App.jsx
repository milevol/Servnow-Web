import { Route, Routes } from "react-router";
import AnswerEndPage from "./pages/AnswerEndPage";
import AnswerPage from "./pages/AnswerPage";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/answerend" element={<AnswerEndPage />} />
      <Route path="/answer" element={<AnswerPage />} />
    </Routes>
  );
}

export default App;
