import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { About } from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />;
      </Switch>
    </div>
  );
}

export default App;
