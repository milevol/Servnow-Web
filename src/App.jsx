import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AnswerEndPage from "./pages/AnswerEndPage";
import LoginPage from "./pages/LoginPage";
import AnswerPage from "./pages/AnswerPage";
import SignUpPage from "./pages/signup/SignUpPage";
import MyPage from "./pages/MyPage";
import ResultPage from "./pages/ResultPage";
import AnswerStartPage from "./pages/AnswerStartPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import FindIdPage from "./pages/FindIdPage";
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
      <Route path="/result" element={<ResultPage />} />
      <Route path="/answerstart" element={<AnswerStartPage />} />
      <Route path="/find-id" element={<FindIdPage />} />
      <Route path="/find-pswd" element={<FindPasswordPage />} />
      <Route path="/surveymodal" element={<SurveyModalPage />} />
      <Route path="/created-surveys" element={<MySurveyPage />} />
      <Route path="/answered-surveys" element={<MyAnsweredPage />} />
    </Routes>
  );
}

export default App;
