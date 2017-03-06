import React from 'react';
import { Header, Icon, Image, Button, Container, Menu, Segment, Item } from 'semantic-ui-react'
import { Link } from 'react-router';
import axios from 'axios';



const ItemInProfile = (props) => (
  <Item>
    {}
    <Item.Image size='tiny' src={props.item.image_links[0]} />

    <Item.Content>
      <Item.Header as='a'>{`Status: ${props.activeItem}`}</Item.Header>
      <Item.Meta>{props.item.title}</Item.Meta>
      <Item.Extra>Additional Details</Item.Extra>
    </Item.Content>
  </Item>
)



const ItemExampleItems = (props) => (
  <Item.Group>
    {props.items.length > 0 ? props.items.map((item) => {
      return <ItemInProfile item={item} key={item.id} activeItem={props.activeItem}/>
    }) : <h1>You have nothing here yet.</h1>}
  </Item.Group>
)

class MenuExampleSecondaryPointing extends React.Component {

  render() {
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='delivery' active={this.props.activeItem === 'delivery'} onClick={this.props.handleItemClick} />
          <Menu.Item name='selling' active={this.props.activeItem === 'selling'} onClick={this.props.handleItemClick} />
          <Menu.Item name='sold' active={this.props.activeItem === 'sold'} onClick={this.props.handleItemClick} />
          <Menu.Item name='bought' active={this.props.activeItem === 'bought'} onClick={this.props.handleItemClick} />
        </Menu>

        <Segment>
          <ItemExampleItems items={this.props.items} activeItem={this.props.activeItem}/>
        </Segment>
      </div>
    )
  }
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'delivery',
      delivery: [],
      selling: [],
      sold: [],
      bought: []
    };
  }

  handleItemClick = (e, { name }) => {
    // console.log('e', e, 'name', name);
    this.setState({ activeItem: name })
  }

  componentDidMount() {
    console.log('Profile componentDidMount')
    var context = this;
    this.setState({ activeItem: this.props.params.activeItem });
    console.log(context.props.state.user.id, 'selling')
    axios.get('/api/v1/getuserproducts', {
        params: {
          user_id: context.props.state.user.id,
          condition: 'selling'
        }
      })
      .then(function (response) {
        console.log(response.data);
        context.setState({selling: response.data})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const items = this.state[this.state.activeItem];
    return (
      <div>
        <Container textAlign='center'>
          <Header as='h2' icon textAlign='center'>
            <Icon name='users' circular />
            <Header.Content>
              {this.props.state.user.first_name}
            </Header.Content>
          </Header>
          <Button as={Link} to={'/account-edit'}basic color='red'>
            Edit profile
          </Button>        
        </Container>
        <MenuExampleSecondaryPointing handleItemClick={this.handleItemClick} items={items} activeItem={this.state.activeItem}/>
      </div>
    );
  }
}

export default Profile;