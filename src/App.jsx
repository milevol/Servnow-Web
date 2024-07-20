import { Route, Routes } from "react-router";
import SignUpToggle from "./pages/SignUpToggle";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/signup" element={<SignUpToggle />} />
    </Routes>
  );
}

export default App;
