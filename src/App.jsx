import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AnswerEndPage from "./pages/AnswerEndPage";
import LoginPage from "./pages/LoginPage";
import AnswerPage from "./pages/AnswerPage";
import SignUpPage from "./pages/signup/SignUpPage";
import MyPage from "./pages/MyPage";
import SurveyModalPage from "./pages/SurveyModalPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import FindIdPage from './pages/FindIdPage';
import MyInfoModifyPage from "./pages/mypage/MyInfoModifyPage";
import MyInfoModifyKakaoPage from "./pages/mypage/MyInfoModifyKakaoPage";
import KakaoAuthRedirectHandler from "./components/login/KakaoAuthRedirecteHandler";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/answerend" element={<AnswerEndPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/kakao" element={<KakaoAuthRedirectHandler />} />
      <Route path="/answer" element={<AnswerPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/surveymodal" element={<SurveyModalPage />} />
      <Route path="/find-id" element={<FindIdPage />} />
      <Route path="/find-pswd" element={<FindPasswordPage />} />
      <Route path="/myinfo" element={<MyInfoModifyPage />} />
      <Route path="/myinfo-k" element={<MyInfoModifyKakaoPage />} />
    </Routes>
  );
}

export default App;
