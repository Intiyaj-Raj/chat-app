import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
