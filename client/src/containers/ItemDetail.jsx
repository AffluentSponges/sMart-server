import React from 'react';
import { Dimmer, Loader, Grid, Image, Segment, Divider, Button, Container } from 'semantic-ui-react'
import axios from 'axios';

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thisProduct: '',
      products: '',
      uber: {
        dropoff_eta: '',
        pickup_eta: '',
        uber_delivery_price: ''
      },
      seller: ''
    }
  }

  componentDidMount() {
    // Performing Multiple Requests simultaneously
    // Requests will be executed in parallel...
    // axios.all([
    //     axios.get('https://api.github.com/users/codeheaven-io');
    //     axios.get('https://api.github.com/users/codeheaven-io/repos')
    //   ])
    //   .then(axios.spread(function (userResponse, reposResponse) {
    //     //... but this callback will be executed only when both requests are complete.
    //     console.log('User', userResponse.data);
    //     console.log('Repositories', reposResponse.data);
    //   }));

    var context = this;
    axios.get('/api/v1/product', {
      params: {
        id: this.props.params.postId
      }
    })
    .then(function (response) {
      console.log(response);
      context.setState({thisProduct: response.data});
      axios.get('/api/v1/getuserprofile', {
          params: {
            id: response.data.seller_id
          }
        })
        .then(function (response) {
          console.log('/api/v1/getuserprofile', response.data);
          context.setState({seller: response.data})
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
    axios.get('/api/v1/product/get_quote', {
      params: {
        product_id: this.props.params.postId,
        buyer_id: this.props.state.user.id
      }
    })
    .then(function (response) {
      console.log(response);
      context.setState({uber: response.data});
      console.log('context.state', context.state)
    })
    .catch(function (error) {
      console.log(error);
    });
  // ?product_id=3& buyer_id=4  '/api/v1/product/get_quote'
  }

  render() {
    // let _this = this;
    // let postId = this.props.params.postId;
    // let itemObj = this.props.items.filter(function (item) {
    //   return item.postId == _this.props.params.postId;
    // })[0];
    // let temp = JSON.stringify(itemObj);
    var dimmer = !this.state.uber.dropoff_eta;
    var imgSrc;
    if (this.state.thisProduct.image_links) {
      imgSrc = this.state.thisProduct.image_links[0];
    } else {
      imgSrc = ''
    }
    return (
      <Grid centered>
        <Grid.Column width={10}>
          <Segment>
              <Image src={imgSrc} size='medium' centered/>
              <p className='description'>
                <strong>Discription</strong><br/>
                {this.state.thisProduct.description}
              </p>
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment>
            <Grid centered columns={2}>
              <Grid.Row>
                <h1>${this.state.thisProduct.asking_price}</h1>
              </Grid.Row>
              <Grid.Row>
                <h2>{this.state.thisProduct.title}</h2>
              </Grid.Row>
              <Divider horizontal>Uber</Divider>
              <Container>
                <Dimmer active={dimmer}>
                  <Loader />
                </Dimmer>
                <Grid.Row>
                  <h2>{`UberRUSH fee is $${this.state.uber.uber_delivery_price}`}</h2>
                </Grid.Row>
                <Grid.Row>
                  <h2>You will get this in</h2>
                </Grid.Row>   
                <Grid.Row>
                  <h2>{`${this.state.uber.dropoff_eta + this.state.uber.pickup_eta} mins`}</h2>
                </Grid.Row>
              </Container>                       
              <Grid.Row>
                <Button size='huge' className='buy' color='red'>
                  Buy now!
                </Button>
              </Grid.Row>
            </Grid>
          </Segment>
          <Divider horizontal>ABOUT THE SELLER</Divider>
          <Segment>
            <Grid.Row>
              <h3>{this.state.seller.first_name + ' ' + this.state.seller.last_name}</h3>
            </Grid.Row>
          </Segment>
        </Grid.Column>
      </Grid>

    );
  }
}

export default ItemDetail;