import { Route, Routes } from "react-router";
import AnswerEndPage from "./pages/AnswerEndPage";
import AnswerPage from "./pages/AnswerPage";
import SignUpPage from "./pages/signup/SignUpPage";
import MyPage from "./pages/MyPage";
import SurveyModalPage from "./pages/SurveyModalPage";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/answerend" element={<AnswerEndPage />} />
      <Route path="/answer" element={<AnswerPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/surveymodal" element={<SurveyModalPage />} />
    </Routes>
  );
}

export default App;
