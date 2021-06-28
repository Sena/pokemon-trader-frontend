import axios from "axios";
import { Component } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";

class History extends Component {
  constructor() {
    super();
    this.state = { exchange: [] };
  }
  componentDidMount() {
    axios
      .get("https://bxblue-poke-trader.herokuapp.com/exchange")
      .then((result) => {
        this.setState({
          exchange: result.data.exchange
        });
      });
  }
  render() {
    const exchange = this.state.exchange.map((exchange) => {
      return (
        <Row className="exchange">
          <Col>
            <h3>Player1</h3>
            <h4>Total de pontos: {exchange.player1Total}</h4>
            {exchange.player1
              .map((pokemon) => {
                return pokemon.name;
              })
              .join(", ")}
          </Col>
          <Col>
            <h3>Player2</h3>
            <h4>Total de pontos: {exchange.player2Total}</h4>
            {exchange.player2
              .map((pokemon) => {
                return pokemon.name;
              })
              .join(", ")}
          </Col>
          <p>{exchange.textExchange}</p>
        </Row>
      );
    });
    return (
      <Container className="history justfy-content text-center">
        <h1>Poke trader - Histórico de trocas</h1>
        <a href="/" className="main-action">
          <Button variant="outline-primary">Trocas</Button>
        </a>
        <div className="exchange-list">{exchange}</div>
      </Container>
    );
  }
}
export default History;
