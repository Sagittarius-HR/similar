import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';

const ArrowContainer = styled.div`
position: absolute;
height: 100%;
left: ${props => props.direction === 'left' ? '5px' : ''};
right: ${props => props.direction === 'left' ? '' : '49px'};
top: 0;

/* Styling for actual arrow divs */
& > div {
  border-radius: 50px;
  height: 44px;
  width: 44px;
  background: #FFF;
  opacity: .7;
  text-align:center;
  line-height: 44px;
  font-family: 'Poppins', sans-serif;
  font-size: 50px;
  font-weight: 900;
  position:absolute;
  z-index: 6;
  top: 50%;
  cursor: pointer;
}
`;

const Arrow = styled.div`
/*Arrow right*/
`;

class MenuArrow extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <ArrowContainer direction = {this.props.direction}>
        <Arrow>{this.props.direction === 'left' ? '<' : '>'}</Arrow>
      </ArrowContainer>
    )
  }
}

export default MenuArrow;
