import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Samplepage from "./module/Samplepage.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Samplepage/>} />
      </Routes>
    </div>
  );
}

export default App;
