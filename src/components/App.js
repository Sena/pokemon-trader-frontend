import { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Shelf from "./Shelf";
import History from "./History";

class App extends Component {
  constructor() {
    super();
    this.state = {
      orderBy: "id",
      orderDir: "asc",
      queryText: "",
      pokemon: [],
      pokemonSelected: {
        player1: [],
        player2: []
      }
    };
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/historico">
              <History />
            </Route>
            <Route path="/">
              <Shelf />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
