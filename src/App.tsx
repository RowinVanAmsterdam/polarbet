import React from "react";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { IpfsImage } from "./pages/IpfsImage";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="Container">
        <Header />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/ipfs-image" exact component={IpfsImage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
