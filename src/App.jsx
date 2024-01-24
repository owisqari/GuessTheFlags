import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Asia from "./pages/Asia";
import Game from "./pages/Game";
import Americas from "./pages/Americas";
import Africa from "./pages/Africa";
import Europe from "./pages/Europe";
import LeaderBoard from "./pages/LeaderBoard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<Game />} />
        <Route path="/asia" element={<Asia />} />
        <Route path="/americas" element={<Americas />} />
        <Route path="/africa" element={<Africa />} />
        <Route path="/europe" element={<Europe />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
