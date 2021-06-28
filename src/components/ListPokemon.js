import { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import unknow from "../images/unknow.png";

class ListPokemon extends Component {
  render() {
    if (this.props.pokemon.length === 0) {
      return <h2>Digite um nome de pokemon válido.</h2>;
    }
    const pokemon = this.props.pokemon.map((pokemon) => {
      return (
        <Col
          className="pokemon text-center"
          xl={1}
          lg={2}
          md={3}
          sm={4}
          key={pokemon.id}
        >
          <div className="add-btn">
            <p>Adicionar para</p>
            <Button
              variant="outline-primary"
              onClick={() => {
                this.props.selectPokemon(pokemon.id, 1);
              }}
            >
              Player 1
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => {
                this.props.selectPokemon(pokemon.id, 2);
              }}
            >
              Player 2
            </Button>
          </div>
          <img
            src={pokemon.sprites.front_default}
            onError={(e) => {
              e.currentTarget.src = unknow;
            }}
            alt={pokemon.name}
            title={pokemon.name}
            loading="lazy"
          />
          <p>{pokemon.name}</p>
        </Col>
      );
    });
    return (
      <Container className="pokemon-list">
        <Row className="justify-content-center">{pokemon}</Row>
      </Container>
    );
  }
}
export default ListPokemon;
