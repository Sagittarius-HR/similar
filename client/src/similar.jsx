const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const styled = require('styled-components').default;
const Dog = require('./components/dog.jsx').default;
const DogMenu = require('./components/dogMenu.jsx').default;

var url = window.location.hostname === 'localhost' ? 'http://localhost' : 'http://ec2-54-185-0-112.us-west-2.compute.amazonaws.com';



const StyledHeader = styled.h3`
  color: #6504b5;
  text-align: center;
  font-size: 40px;
  clear:both;
  margin: 0 10px;
`;

class Similar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {id: 1, list:[], ready: false};
    // call it again if items count changes
  }

  componentDidMount() {
    var dogID = Number.parseFloat(window.location.pathname.replace(/^\/+|\/+$/g, ''));
    if (Number.isNaN(dogID)) {
      dogID = 1;
    }
    var that = this;
    $.ajax({
      method:'GET',
      url: url + ':3001/url/' + dogID
    }).done(function(data){
      that.setState({
        list: data.ranks,
        id: dogID,
        ready: true
      })
    })
  }

  renderDogMenu() {
    return (
      <DogMenu id = {this.state.id} list = {this.state.list}
        />
    )
  }
  
  render() {
    return (
      <div className = 'App'>
        <StyledHeader>Similar Breeds</StyledHeader>
        <div>
         {this.state.ready ? this.renderDogMenu() : "Loading.."}
        </div>
      </div>
    )
  }
}

// ReactDOM.render(
//   <App id = '1'/>, document.getElementById('similarContainer')
// )

window.Similar = Similar;
