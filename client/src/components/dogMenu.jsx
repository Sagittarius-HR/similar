import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';
import Dog from './dog.jsx';
import MenuArrow from './arrows.jsx';

const StyledMenu = styled.div`
  clear:both;
  background-color: #efeef1;
  max-width: 1220px;
  min-width: 650px;
  margin: 0 auto;
  padding-top: 20px;
  display: inline-block;
  position: relative;
`;

const DogContainer = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  display: inline-block;
  width: 100%;
`;

const NavDots = styled.div`
  

  /* Styling for actual dot*/
  & > div {
    width: 10px;
    height: 10px;
    margin: 0 8px;
    background: '#333';
    border-radius: 50%;
    opacity: ${props => props.selected === true ? .25 : 1};
    cursor: pointer;
  }
`;

const NavDot = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 8px;
  background: '#333';
  border-radius: 50%;
  opacity: ${props => props.selected === true ? .25 : 1};
  cursor: pointer;

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

class DogMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    var mappedItems = this.props.list.map(el => {
      const {id} = el;
      return <Dog id={id} key={id} />;
    });
    return (
      <StyledMenu>
        <MenuArrow direction = "left"/>
        <DogContainer>
          {mappedItems}
        </DogContainer>
        <MenuArrow direction = "right"/>
      </StyledMenu>
    )
  }
}

export default DogMenu;