import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';

const StyledDot = styled.div`
  float: left;
  width: 10px;
  height: 10px;
  margin: 0 8px;
  background: #333;
  border-radius: 50%;
  opacity: ${props => props.selected ? 1 : .25};
  cursor: pointer;
`;

class NavDot extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <StyledDot onClick= {(e) => this.props.dotClick(this.props.index)} selected = {this.props.selected}></StyledDot>
    )
  }
}

export default NavDot;
