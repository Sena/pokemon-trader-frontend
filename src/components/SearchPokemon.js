import { Component } from "react";
import { Container, Form, InputGroup, FormControl } from "react-bootstrap";

class SearchPokemon extends Component {
  render() {
    return (
      <Container className="search-pokemon justfy-content">
        <Form>
          <InputGroup>
            <FormControl
              id="inlineFormInputGroup"
              placeholder="Digite o nome de um pokemon"
              onChange={(e) => {
                this.props.searchPokemonName(e.currentTarget.value);
              }}
            />
            <InputGroup.Prepend>
              <Form.Control
                as="select"
                defaultValue={this.props.orderBy}
                onChange={(e) =>
                  this.props.changeOrder(
                    e.currentTarget.value,
                    this.props.orderDir
                  )
                }
              >
                <option value="id">Ordenação padrão</option>
                <option value="name">Ordenar por nome</option>
              </Form.Control>
            </InputGroup.Prepend>
            <InputGroup.Prepend>
              <Form.Control
                as="select"
                defaultValue={this.props.orderDir}
                onChange={(e) =>
                  this.props.changeOrder(
                    this.props.orderBy,
                    e.currentTarget.value
                  )
                }
              >
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
              </Form.Control>
            </InputGroup.Prepend>
          </InputGroup>
        </Form>
      </Container>
    );
  }
}
export default SearchPokemon;
