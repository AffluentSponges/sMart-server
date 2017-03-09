import React from 'react'
import { Menu, Button, Dropdown, Divider} from 'semantic-ui-react'
import { Link } from 'react-router'
import Search from './Search.jsx'
import Dimensions from 'react-dimensions'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state
    var size = 'large';
    if (this.props.containerWidth < 1000) {
      size = 'massive';
    }
    return (
      <Menu size={size}>
        <Menu.Item as={Link} to='/'name='smart' active={activeItem === 'smart'} onClick={this.handleItemClick}>
          <img src='https://s3-us-west-1.amazonaws.com/affluentsponges/product_image/2159697316767985.jpg' />
        </Menu.Item>
        <Menu.Menu position='right'>
          {this.props.loggedIn ? (
            <Dropdown item text={this.props.appState.user.first_name}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/u/${this.props.appState.user.id}/selling`}>My Profile</Dropdown.Item>
                <Divider />
                <a href='/logout'><Dropdown.Item onClick={this.props.logout}>Log Out</Dropdown.Item></a>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Menu.Item as={Link} to='/login' name='Log in' active={activeItem === 'Log in'} onClick={this.handleItemClick} >
              <Button basic color='red' >
                Log in
              </Button>
            </Menu.Item>
          )}
          <Menu.Item position='right' as={Link} to='/post' name='Sell Your Stuff' active={activeItem === 'Sell Your Stuff'} onClick={this.handleItemClick} >
            <Button color='red'>
              Sell Your Stuff
            </Button>
          </Menu.Item>
        </Menu.Menu>      
      </Menu>      
    );
  }
}

export default Dimensions()(Header);

