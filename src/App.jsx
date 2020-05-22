import React from "react";
import RootRoute from "./navigation/RootRoute";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <RootRoute />
    </BrowserRouter>
  );
}

export default App;
