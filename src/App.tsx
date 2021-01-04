import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="Container">
        <Header />
        <Switch>
          <Route path="/" exact component={Home}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
