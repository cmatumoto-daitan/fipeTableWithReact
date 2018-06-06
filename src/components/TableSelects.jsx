import React from 'react';
import CarSelect from './CarSelect';
import getInfoFromFipeTable from '../infoFipeTable';

const url = 'http://fipeapi.appspot.com/api/1/carros';
// 0 - typeID | 1 - vehicleID | 2 - modelId
const ids = [];
let typeList = [];
let vehiclelist = [];
let modelList = [];
let preco = '';

class TableSelects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false,
    };
    this.updateSelects = this.updateSelects.bind(this);
  }

  async componentWillMount() {
    try {
      typeList = await getInfoFromFipeTable(`${url}/marcas.json`);
      return typeList;
    } catch (error) {
      console.log(`Error: ${error}`);
      return error;
    } finally {
      this.setState({ click: true });
    }
  }

  async updateSelects(event) {
    if (event.target.parentElement.selectedIndex !== undefined) {
      try {
        let recebido = { id: event.target.id };
        preco = '';
        if (event.target.parentElement.name === 'type') {
          ids[0] = recebido.id;
          const array = await getInfoFromFipeTable(`${url}/veiculos/${ids[0]}.json`);
          vehiclelist = [...array];
          modelList = [];
        } else if (event.target.parentElement.name === 'vehicle') {
          ids[1] = recebido.id;
          const array = await getInfoFromFipeTable(`${url}/veiculo/${ids[0]}/${ids[1]}.json`);
          modelList = [...array];
        } else {
          ids[2] = recebido.id;
          const array = await getInfoFromFipeTable(`${url}/veiculo/${ids[0]}/${ids[1]}/${ids[2]}.json`);
          recebido = { valor: array.preco };
          preco = recebido.valor;
        }
      } catch (error) {
        console.log('Erro:', error);
      } finally {
        // change the state to re-render the list
        this.setState({ click: this.state.click === false });
      }
    }
  }

  render() {
    return (
      <div>
        <table align="center" cellSpacing="100">
          <tbody>
            <tr>
              <td>
                <CarSelect name="type" onClick={this.updateSelects} list={typeList} />
              </td>
              <td>
                <CarSelect name="vehicle" onClick={this.updateSelects} list={vehiclelist} />
              </td>
              <td>
                <CarSelect name="model" onClick={this.updateSelects} list={modelList} />
              </td>
            </tr>
          </tbody>
        </table>
        <h1 id="preco" align="center">{preco}</h1>
      </div>);
  }
}

export default TableSelects;
