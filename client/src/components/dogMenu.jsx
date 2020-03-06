import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';
import Dog from './dog.jsx';
import MenuArrow from './arrows.jsx';
import NavDot from './navdot.jsx';

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
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
  display: inline-block;
  width: 100%;
`;

const NavDots = styled.div`
  clear: both;
  margin: auto;
  display: flex;
  justify-content: center;
`;

class DogMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {current: 0};

    this.scrollOnMenu = this.scrollOnMenu.bind(this);
    this.clickOnDot = this.clickOnDot.bind(this);
  }
  
  scrollOnMenu (direction) {
    var scrollNumber = direction === 'left' ? -1 : 1;
    var newCurrent = (this.state.current + scrollNumber) % this.props.list.length;
    newCurrent = newCurrent < 0 ? this.props.list.length + newCurrent : newCurrent;
    this.setState({current: newCurrent});
  }

  clickOnDot(index) {
    this.setState({current: index});
  }

  render() {
    var mappedItems = this.props.list.filter((item, i) => {
      return (i >= this.state.current && i <= this.state.current + 2) ;
    });
    var mappedOverflow = this.props.list.filter((item, i) => {
      return (this.state.current + 2 >= this.props.list.length && i <= (this.state.current + 2) % this.props.list.length) ;
    });
    mappedItems = mappedItems.concat(mappedOverflow);
    mappedItems = mappedItems.map(el => {
      var id = el.id;
      return <Dog id={id} key={id} />;
    });

    var dotsArray = [];
    for (var i = 0; i < this.props.list.length; i++) {
      dotsArray.push(<NavDot selected = {i === this.state.current} key = {i} index = {i} dotClick = {this.clickOnDot}></NavDot>);
    }

    return (
      <StyledMenu>
        <MenuArrow direction = "left" scrollOnMenu = {this.scrollOnMenu}/>
        <DogContainer>
          {mappedItems}
        </DogContainer>
        <MenuArrow direction = "right" scrollOnMenu = {this.scrollOnMenu}/>
        <NavDots>
          {dotsArray}
        </NavDots>
      </StyledMenu>
    )
  }
}

export default DogMenu;