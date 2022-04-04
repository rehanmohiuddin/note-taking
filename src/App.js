import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Frontend/Pages/Home";
import Archive from "./Frontend/Pages/Archive";
import HomePage from "./Frontend/Pages/HomePage";
import RouteNotFound from "./Frontend/Pages/PageNotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="*" element={<RouteNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
