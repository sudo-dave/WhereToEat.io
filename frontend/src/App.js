import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gameroom from "./Routes/Gameroom";
import Home from "./Routes/Home";
import Error from "./Routes/Error";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Gameroom />} />
        <Route path="*" element={<Error msg="404 Page Not Found" />} />
      </Routes>
    </Router>
  );
};

export default App;
