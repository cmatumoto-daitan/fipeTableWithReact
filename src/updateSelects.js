async updateSelects(event) {
  if (event.target.parentElement.selectedIndex !== undefined) {
    try {
      const id = event.target.id;
      if (event.target.parentElement.id === 'type') {
        ids[0] = id;
        const array = await getInfoFromFipeTable(`${url}/veiculos/${ids[0]}.json`);
        vehiclelist = array;
        modelList = [];
      } else if (event.target.parentElement.id === 'vehicle') {
        ids[1] = id;
        const array = await getInfoFromFipeTable(`${url}/veiculo/${ids[0]}/${ids[1]}.json`);
        modelList = array;
      } else {
        ids[2] = id;
        const array = await getInfoFromFipeTable(`${url}/veiculo/${ids[0]}/${ids[1]}/${ids[2]}.json`);
        this.setState.preco = array.preco;
      }
    } catch (error) {
      console.log('Erro:', error);
    }
  }
};

export default updateSelects;