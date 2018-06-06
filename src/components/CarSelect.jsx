import React from 'react';
import PropTypes from 'prop-types';

function renderLineOptions(props) {
  const list = props;
  let linesOption = '';
  if (props !== undefined && props.length !== 0 && props.length !== undefined) {
    linesOption = list.map(line => <option key={line.key} id={line.id}>{line.name}</option>);
  } else {
    linesOption = <option />;
  }
  return linesOption;
}

function CarSelect(props) {
  return (<select size="5" name={props.name} width="200" onClick={props.onClick}> {renderLineOptions(props.list)} </select>);
}

CarSelect.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object),
};

CarSelect.defaultProps = {
  list: [],
};
export default CarSelect;
