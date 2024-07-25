import { Route, Routes } from "react-router";
import LoginPage from './pages/LoginPage'
import FindPasswordPage from "./pages/FindPasswordPage";
import FindIdPage from "./pages/FindIdPage";
function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/find-pswd" element={<FindPasswordPage />} />
      <Route path="/find-id" element={<FindIdPage />} />
    </Routes>
  );
}

export default App;
