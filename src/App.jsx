import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AnswerEndPage from "./pages/AnswerEndPage";
import LoginPage from "./pages/LoginPage";
import AnswerPage from "./pages/AnswerPage";
import SignUpPage from "./pages/signup/SignUpPage";
import MyPage from "./pages/MyPage";
import SurveyModalPage from "./pages/SurveyModalPage";
import MySurveyPage from "./pages/mysurveypage/MySurveyPage";
import MyAnsweredPage from "./pages/mysurveypage/MyAnsweredPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/answerend" element={<AnswerEndPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/answer" element={<AnswerPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/surveymodal" element={<SurveyModalPage />} />
      <Route path="/mysurvey" element={<MySurveyPage />} />
      <Route path="/myansweredsurvey" element={<MyAnsweredPage />} />
    </Routes>
  );
}

export default App;
