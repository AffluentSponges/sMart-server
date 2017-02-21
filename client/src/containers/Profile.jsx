import React from 'react';
import { Header, Icon, Image, Button, Container, Menu, Segment } from 'semantic-ui-react'


class MenuExampleSecondaryPointing extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
          <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
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
          <Button basic color='red'>
            Edit profile
          </Button>        
        </Container>
        <MenuExampleSecondaryPointing />
      </div>
    );
  }
}

export default Profile;