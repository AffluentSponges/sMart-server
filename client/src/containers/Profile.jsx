import React from 'react';
import { Header, Icon, Image, Button, Container, Menu, Segment, Item, Grid } from 'semantic-ui-react'
import { Link } from 'react-router';
import axios from 'axios';
import HistoryItemList from '../components/HistoryItemList.jsx';

class Empty extends React.Component {
  render() {
    return (
      <Grid centered columns={3}>
        <Grid.Column width={4}>
          <Image size='medium' src='https://s3-us-west-1.amazonaws.com/affluentsponges/product_image/1816288512803256.jpg' />
          <h1 style={{'color': '#555555', 'margin-top': '0px'}}>Oh - Uh</h1>
          <h1 style={{'color': '#555555'}}>You have nothing here</h1>
        </Grid.Column>         
      </Grid>
    )
  }
}
class MenuExampleSecondaryPointing extends React.Component {

  render() {
    return (
      <div>
        <Menu pointing secondary color='red' size='huge' style={{'margin-bottom': '0px'}}>
          <Menu.Item name='selling' active={this.props.activeItem === 'selling'} onClick={this.props.handleItemClick} />
          <Menu.Item name='sold' active={this.props.activeItem === 'sold'} onClick={this.props.handleItemClick} />
          <Menu.Item name='bought' active={this.props.activeItem === 'bought'} onClick={this.props.handleItemClick} />
        </Menu>

        <Segment style={{'margin-top': '0px'}}>
          {this.props.items.length === 0 ? <Empty />
            : <HistoryItemList items={this.props.items} activeItem={this.props.activeItem}/>
          }
        </Segment>
      </div>
    )
  }
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'selling',
      selling: [],
      sold: [],
      bought: [],
      intervalID: []
    };
    this.getDeliveryItems = this.getDeliveryItems.bind(this);
  }

  handleItemClick = (e, { name }) => {
    // console.log('e', e, 'name', name);
    this.setState({ activeItem: name })
  }

  componentDidMount() {
    var context = this;
    this.setState({ activeItem: this.props.params.activeItem });
    axios.get('/api/v1/getuserproducts', {
        params: {
          user_id: context.props.state.user.id,
          condition: 'selling'
        }
      })
      .then(function (response) {
        context.setState({selling: response.data})
      })
      .catch(function (error) {
        console.log(error);
      });
      this.getDeliveryItems();
      this.getSoldItems();
  }

  getDeliveryItems() {
    var context = this;
    var intervalID;
    axios.get('/api/v1/getuserproducts', {
        params: {
          user_id: context.props.state.user.id,
          condition: 'delivery'
        }
      })
      .then(function (response) {
        var data = response.data.map((transaction) => {
          var item = transaction.product;
          item.status = transaction.status;
          return item;
        });
        context.setState({bought: data})
      })
      .catch(function (error) {
        console.log(error);
      });      
  }

  getSoldItems() {
    var context = this;
    var intervalID;
    axios.get('/api/v1/getuserproducts', {
        params: {
          user_id: context.props.state.user.id,
          condition: 'sold'
        }
      })
      .then(function (response) {
        context.setState({sold: response.data})
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
            <Icon name='users' circular style={{'margin-top': '25px'}}/>
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