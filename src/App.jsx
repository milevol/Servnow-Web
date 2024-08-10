import { Route, Routes } from "react-router";
import AnswerEndPage from "./pages/AnswerEndPage";
import AnswerPage from "./pages/AnswerPage";
import SignUpPage from "./pages/signup/SignUpPage";
import MyInfoModifyPage from "./pages/mypage/MyInfoModifyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MyInfoModifyPage />}/>
      <Route path="/answerend" element={<AnswerEndPage />} />
      <Route path="/answer" element={<AnswerPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
