import React from 'react'
import CarSelect from './CarSelect.jsx'
import getInfoFromFipeTable from '../infoFipeTable';


// const list = [{ "key": "palio-4826", "name": "Palio 1.0 Celebr. ECONOMY F.Flex 8V 4p", "id": "4826", "fipe_name": "Palio 1.0 Celebr. ECONOMY F.Flex 8V 4p" },
// { "key": "palio-4827", "name": "Palio 1.0 ECONOMY Fire Flex 8V 2p", "id": "4827", "fipe_name": "Palio 1.0 ECONOMY Fire Flex 8V 2p" },
// { "key": "palio-4828", "name": "Palio 1.0 ECONOMY Fire Flex 8V 4p", "id": "4828", "fipe_name": "Palio 1.0 ECONOMY Fire Flex 8V 4p" },
// { "key": "palio-505", "name": "Palio 1.0/ Trofeo 1.0 Fire/ Fire Flex 2p", "id": "505", "fipe_name": "Palio 1.0/ Trofeo 1.0 Fire/ Fire Flex 2p" }]
const url = 'http://fipeapi.appspot.com/api/1/carros';

class TableSelects extends React.Component {
  constructor(props) {
    super(props);
    //0 - typeID | 1 - vehicleID | 2 - modelId
    this.state = {
      click: false,
    }
    //this.updateSelects = this.updateSelects.bind(this);
  }
  async inicia() {
    try {
      const array = await getInfoFromFipeTable(`${url}/marcas.json`);
      (array) => { this.props.typeList = [...array]};
      this.setState({ click: true })
    }
    catch (error) {
      console.log('Error:');
    }
  }

  componentDidMount() {
    this.inicia();
  }

  async updateSelects(event) {
    if (event.target.parentElement.selectedIndex !== undefined) {
      try {
        const id = event.target.id;
        if (event.target.parentElement.id === 'type') {
          ids[0] = id;
          const array = await getInfoFromFipeTable(`${url}/veiculos/${ids[0]}.json`);
          this.props.vehiclelist = [...array];
          this.props.modelList = [];
        } else if (event.target.parentElement.id === 'vehicle') {
          ids[1] = id;
          const array = await getInfoFromFipeTable(`${url}/veiculo/${ids[0]}/${ids[1]}.json`);
          this.props.modelList = [...array];
        } else {
          ids[2] = id;
          const array = await getInfoFromFipeTable(`${url}/veiculo/${ids[0]}/${ids[1]}/${ids[2]}.json`);
          this.props.preco = array.preco;
        }
        this.setState({ click: this.state.click ? false : true });
      } catch (error) {
        console.log('Erro:', error);
      }
    }
  }

  render() {
    return (
      <div>
        <table align='center' cellSpacing="100">
          <tbody>
            <tr>
              <td>
                <CarSelect name='type' onClick={this.updateSelects} list={this.props.typeList} />
              </td>
              <td>
                <CarSelect name='vehicle' onClick={this.updateSelects} list={this.props.vehiclelist} />
              </td>
              <td>
                <CarSelect name='model' onClick={this.updateSelects} list={this.props.modelList} />
              </td>
            </tr>
          </tbody>
        </table>

        <h1 id='preco' align='center'>{this.props.preco}</h1>
      </div>)
  }
}


TableSelects.defaultProps = {
  ids: [],
  typeList: [],
  vehiclelist: [],
  modelList: [],
  preco: ''
};

export default TableSelects;