import React from 'react';
import { Header, Icon, Image, Button, Container, Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router';


class MenuExampleSecondaryPointing extends React.Component {
  state = { activeItem: 'selling' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='delivery' active={activeItem === 'delivery'} onClick={this.handleItemClick} />
          <Menu.Item name='selling' active={activeItem === 'selling'} onClick={this.handleItemClick} />
          <Menu.Item name='sold' active={activeItem === 'sold'} onClick={this.handleItemClick} />
          <Menu.Item name='bought' active={activeItem === 'bought'} onClick={this.handleItemClick} />
        </Menu>

        <Segment>
          <img src='http://semantic-ui.com/images/wireframe/media-paragraph.png' />
        </Segment>
      </div>
    )
  }
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Container textAlign='center'>
          <Header as='h2' icon textAlign='center'>
            <Icon name='users' circular />
            <Header.Content>
              Mark Taehoon Jung
            </Header.Content>
          </Header>
          <Button as={Link} to={'/account-edit'}basic color='red'>
            Edit profile
          </Button>        
        </Container>
        <MenuExampleSecondaryPointing />
      </div>
    );
  }
}

export default Profile;