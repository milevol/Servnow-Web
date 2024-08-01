import { Route, Routes } from "react-router";
import AnswerEndPage from "./pages/AnswerEndPage";
import AnswerPage from "./pages/AnswerPage";
import SignUpPage from "./pages/signup/SignUpPage";
import MyInfoModifyKakaoPage from "./pages/mypage/MyInfoModifyKakaoPage";
import MyInfoModifyPage from "./pages/mypage/MyInfoModifyPage";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/answerend" element={<AnswerEndPage />} />
      <Route path="/answer" element={<AnswerPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/myinfo-modify-kakao" element={<MyInfoModifyKakaoPage />} />
      <Route path="/myinfo-modify" element={<MyInfoModifyPage />} />
    </Routes>
  );
}

export default App;
