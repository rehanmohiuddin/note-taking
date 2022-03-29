import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Frontend/Pages/Home";
import HomePage from "./Frontend/Pages/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
