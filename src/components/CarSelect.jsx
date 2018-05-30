import React from 'react';

function LineOption(props) {
	return <option id={props.value}>{props.text}</option>;
}

class CarSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			value: '',
		};
		const list = props.list;
		//this.handleClick = this.handleClick.bind(this);
	}

	// componentDidUpdate() {
	// 	const id = this.state.value;

	// 	if (this.state.name === 'type') {

	// 	}

	// }

	// handleClick(event) {
	// 	if (event.target.parentElement.selectedIndex !== undefined) {
	// 		this.setState({ value: event.target.id });
	// 		if (this.state.name === 'type') {
	// 			typeId=this.state.value;

	// 		}
	// 	}
	// }
	renderLineOptions(props) {

		const list = props;
		let linesOption = '';
		if (props !== undefined && props.length !== 0 && props.length !== undefined ) {
			linesOption = list.map((line) =>
				<option key={line.key} id={line.id}>{line.name}</option>
			);
		} else {
			linesOption = <option />
		}
		return linesOption;

	}

	render() {
		const options = this.renderLineOptions(this.props.list);
		return (<select size='5' name={this.props.name} width='200' onClick={this.props.onClick}> {options} </select>)
	}
}

export default CarSelect;
