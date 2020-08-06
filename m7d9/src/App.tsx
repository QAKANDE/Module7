import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Home />
      </header>
    </div>
  );
}

export default App;
