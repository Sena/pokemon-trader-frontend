import { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

class Calculator extends Component {
  createPokemon(pokemon, player) {
    return (
      <Col className="pokemon" key={pokemon.key}>
        <div className="add-btn">
          <Button
            variant="outline-primary"
            onClick={() => {
              this.props.unselectPokemon(pokemon.id, player);
            }}
          >
            Remover
          </Button>
        </div>
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          title={pokemon.name}
          loading="lazy"
        />
        <p>
          {pokemon.name} - {pokemon.base_experience}
        </p>
      </Col>
    );
  }

  calcDiff(player1Total, player2Total) {
    let percent = 0;
    if (player1Total > player2Total) {
      percent = player1Total / player2Total;
    } else {
      percent = player2Total / player1Total;
    }
    return percent;
  }
  render() {
    if (
      this.props.pokemon.player1.length === 0 &&
      this.props.pokemon.player2.length === 0
    ) {
      return false;
    }
    let key = 1;
    const player1 = this.props.pokemon.player1.map((pokemon) => {
      pokemon.key = key++;
      return this.createPokemon(pokemon, 1);
    });
    const player2 = this.props.pokemon.player2.map((pokemon) => {
      pokemon.key = key++;
      return this.createPokemon(pokemon, 2);
    });
    const player1Total = this.props.pokemon.player1.reduce(
      (total, pokemon) => pokemon.base_experience + total,
      0
    );
    const player2Total = this.props.pokemon.player2.reduce(
      (total, pokemon) => pokemon.base_experience + total,
      0
    );

    const totalDiff = this.calcDiff(player1Total, player2Total);
    const textExchange =
      "Esta é uma troca " + (totalDiff > 1.1 ? "injusta" : "justa");

    return (
      <Container className="calculator pokemon-list justfy-content text-center">
        <Row>
          <Col className="player">
            <h3>Player 1</h3>
            <h4>Total de pontos: {player1Total}</h4>
            <Row>{player1}</Row>
          </Col>
          <Col sm={1}></Col>
          <Col className="player">
            <h3>Player 2</h3>
            <h4>Total de pontos: {player2Total}</h4>
            <Row>{player2}</Row>
          </Col>
        </Row>
        <p>{textExchange}</p>

        <Button
          onClick={(e) => {
            this.props.exchangePokemon(
              player1Total,
              player2Total,
              textExchange
            );
          }}
        >
          Trocar
        </Button>
      </Container>
    );
  }
}
export default Calculator;
