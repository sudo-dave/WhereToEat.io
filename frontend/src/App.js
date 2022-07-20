import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lobby from "./Routes/Lobby";
import Home from "./Routes/Home";
import Error from "./Routes/Error";
import Room from "./components/Room";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solo" element={<Room solo />} />
        <Route path="/room" element={<Lobby />} />
        <Route path="*" element={<Error msg="404 Page Not Found" />} />
      </Routes>
    </Router>
  );
};

export default App;
