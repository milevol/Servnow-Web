import { Route, Routes } from "react-router";
import AnswerEndPage from "./pages/AnswerEndPage";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/answerend" element={<AnswerEndPage />} />
    </Routes>
  );
}

export default App;
