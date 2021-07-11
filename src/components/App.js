import { Component } from "react";
import "../css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchPokemon from "./SearchPokemon";
import Trade from "./Trade";
import ListPokemon from "./ListPokemon";
import History from "./History";
import { Alert, Button } from "react-bootstrap";
const axios = require("axios");

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertHiden: true,
      exchange: [],
      orderBy: "id",
      orderDir: "asc",
      queryText: "",
      pokemon: [],
      historyShow: false,
      baseExperience: [],
      pokemonSelected: {
        player1: [],
        player2: []
      }
    };
    this.changeOrder = this.changeOrder.bind(this);
    this.searchPokemonName = this.searchPokemonName.bind(this);
    this.selectPokemon = this.selectPokemon.bind(this);
    this.unselectPokemon = this.unselectPokemon.bind(this);
    this.exchangePokemon = this.exchangePokemon.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.historyShow = this.historyShow.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://bxblue-poke-trader.herokuapp.com/pokemon")
      .then((result) => {
        this.setState({
          pokemon: result.data.pokemon.map((pokemon) => {
            pokemon.id = parseInt(pokemon.id, 0);
            return pokemon;
          })
        });
      });
  }

  searchPokemonName(text) {
    this.setState({
      queryText: text
    });
  }

  unselectPokemon(id, player) {
    let tempPokemonSelected = this.state.pokemonSelected;
    let selectedPokemon =
      player === 1 ? tempPokemonSelected.player1 : tempPokemonSelected.player2;
    const total = selectedPokemon.length;

    for (var i = 0; i < total; i++) {
      if (selectedPokemon[i].id === id) {
        selectedPokemon.splice(i, 1);
        break;
      }
    }

    if (player === 1) {
      tempPokemonSelected.player1 = selectedPokemon;
    } else {
      tempPokemonSelected.player2 = selectedPokemon;
    }
    this.setState({
      pokemonSelected: tempPokemonSelected
    });
  }

  async getBaseExperience(id) {
    let tempBaseExperience = this.state.baseExperience;

    if (tempBaseExperience.hasOwnProperty(id)) {
      return tempBaseExperience[id];
    }

    let response = await axios.get(
      "https://bxblue-poke-trader.herokuapp.com/pokemon/" + id
    );
    const pokemon = response.data;
    tempBaseExperience[pokemon.id] = pokemon;

    this.setState({
      baseExperience: tempBaseExperience
    });

    return pokemon;
  }

  selectPokemon(id, player) {
    const limit = 6;
    let tempPokemonSelected = this.state.pokemonSelected;
    let selectedPokemon =
      player === 1 ? tempPokemonSelected.player1 : tempPokemonSelected.player2;

    if (selectedPokemon.length >= limit) {
      return false;
    }

    this.getBaseExperience(id).then((pokemon) => {
      if (player === 1) {
        tempPokemonSelected.player1.unshift(pokemon);
      } else {
        tempPokemonSelected.player2.unshift(pokemon);
      }

      this.setState({
        pokemonSelected: tempPokemonSelected
      });
    });
  }

  exchangePokemon(player1Total, player2Total, textExchange) {
    let tempPokemonSelected = this.state.pokemonSelected;
    let tempExchange = this.state.exchange;
    const exchangeData = {
      player1: tempPokemonSelected.player1,
      player2: tempPokemonSelected.player2,
      player1Total,
      player2Total,
      textExchange
    };
    tempExchange.unshift(exchangeData);

    axios
      .post("https://bxblue-poke-trader.herokuapp.com/exchange", exchangeData)
      .then(() => {
        tempPokemonSelected.player1 = [];
        tempPokemonSelected.player2 = [];

        this.setState({
          alertHiden: false,
          exchange: tempExchange,
          pokemonSelected: tempPokemonSelected
        });
      });
  }

  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir
    });
  }
  closeAlert() {
    this.setState({
      alertHiden: true
    });
  }

  historyShow() {
    this.setState({ historyShow: true });
    axios
      .get("https://bxblue-poke-trader.herokuapp.com/exchange")
      .then((result) => {
        this.setState({
          exchange: result.data.exchange
        });
      });
  }
  historyClose = () => this.setState({ historyShow: false });

  render() {
    let order = this.state.orderDir === "asc" ? 1 : -1;

    const filteredPokemon = this.state.pokemon
      .sort((a, b) => {
        if (a[this.state.orderBy] < b[this.state.orderBy]) {
          return -1 * order;
        } else {
          return 1 * order;
        }
      })
      .filter((pokemon) => {
        return pokemon["name"]
          .toLowerCase()
          .includes(this.state.queryText.toLowerCase());
      });

    return (
      <div className="Shelf">
        <h1>Poke trader - Trocas</h1>
        <Button
          variant="outline-primary"
          onClick={this.historyShow}
          className="main-action"
        >
          Histórico
        </Button>
        <Trade
          pokemon={this.state.pokemonSelected}
          unselectPokemon={this.unselectPokemon}
          exchangePokemon={this.exchangePokemon}
        />
        <Alert variant="success" hidden={this.state.alertHiden}>
          <Alert.Heading>Troca efetuada com sucesso</Alert.Heading>
          <p>
            Você pode ver todas as trocas realizadas clicando em "Histórico" no
            canto superior direito.
          </p>
          <div className="d-flex justify-content-end">
            <Button onClick={this.closeAlert} variant="outline-success">
              Fechar
            </Button>
          </div>
        </Alert>
        <SearchPokemon
          orderBy={this.state.orderBy}
          orderDir={this.state.orderDir}
          changeOrder={this.changeOrder}
          searchPokemonName={this.searchPokemonName}
        />
        <ListPokemon
          pokemon={filteredPokemon}
          selectPokemon={this.selectPokemon}
        />
        <History
          show={this.state.historyShow}
          close={this.historyClose}
          exchange={this.state.exchange}
        />
      </div>
    );
  }
}

export default App;
