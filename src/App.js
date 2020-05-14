import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeContainer from "./components/home";
import CommandLineContainer from "./components/command-line";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomeContainer} exact />
        <Route path="/cli" component={CommandLineContainer} exact />
      </Switch>
    </Router>
  );
}

export default App;
