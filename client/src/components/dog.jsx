import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';

var url = window.location.hostname === 'localhost' ? 'http://localhost' : 'http://ec2-54-185-0-112.us-west-2.compute.amazonaws.com';

const StyledImage = styled.img`
  height: 260px;
  width: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  float:left;
  position: relative;
  z-index: 4;
`;
const StyledNameDiv = styled.div`
  height: 33px;
  border-radius: 0 0 10px 10px;
  width: calc(100% - 80px);
  background-color: #FFF; 
  padding: 15px 40px;
  float: left;
  clear:left;
`;

const StyledNameText = styled.h4`
  text-align: center;
  color: #6504b5;
  line-height: 1.2;
  font-size: 24px;   
  margin:0;
  font-weight: 400;
  cursor: pointer;
`;

const StyledImageDiv = styled.div`
  display: inline-block;
  width: calc(47% - 15px);
  margin-right: 10px;
  &:hover {
    ${StyledImage} {
      opacity: .5;
    }
    h4 {
      text-decoration: underline;
    }
  }
`;
const StyledImageWrapper = styled.div`
  width: 100%;
`;


class Dog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {url:'', name:''};

    this.setUrl = this.setUrl.bind(this);
    this.loadUrl = this.loadUrl.bind(this);

    this.setUrl();
  }

  setUrl() {
    var that = this;
    $.ajax({
      method:'GET',
      url: url + ':3001/url/' + that.props.id
    }).done(function(data){
      that.setState({
        url: data.url,
        name: data.name
      })
    })
  }

  loadUrl() {
    location.href = '/' + this.props.id;
  }

  render() {
    return (
      <StyledImageDiv>
        <StyledImageWrapper>
          <StyledImage src = {this.state.url}></StyledImage>
          <StyledNameDiv>
            <StyledNameText onClick = {this.loadUrl}>
              {this.state.name}
            </StyledNameText>
          </StyledNameDiv>
        </StyledImageWrapper>
      </StyledImageDiv>
    )
  }
}

export default Dog;