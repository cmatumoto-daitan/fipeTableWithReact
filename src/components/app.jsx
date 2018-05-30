import React from 'react';
import ReactDOM from 'react-dom';
import TableSelect from './TableSelects.jsx'

class App extends React.Component{
	render(){
		return(
			<div>
				<h1 align='center'>Fipe Table</h1>
				<TableSelect />
			</div>
		)
	}
}

export default App;
