import { Component } from "react";
import { Container, Row, Button, Col, Modal } from "react-bootstrap";

class History extends Component {
  render() {
    const exchange = this.props.exchange.map((exchange) => {
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
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.close}
          dialogClassName="modal-90w history"
        >
          <Modal.Header closeButton>
            <Modal.Title>Histórico de trocas - Últimas 10 trocas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container className="justfy-content text-center">
              <div className="exchange-list">{exchange}</div>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.close}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default History;
