import React from 'react';
import { Dimmer, Loader, Grid, Image, Segment, Divider, Button, Container, Header, Icon, Modal, Input } from 'semantic-ui-react'
import axios from 'axios';
import ReactSVG from 'react-svg'
import Qr from '../components/Qr.jsx'

const LoaderExampleInline = () => (
  <Loader active inline />
)
//<Icon name='checkmark' />
const ModalExampleCloseIcon = (props) => (
  <Modal size='small' trigger={<Button size='huge' className='buy' color='red' onClick={props.checkPayment}>
                    Buy now!
                  </Button>} closeIcon='close'>
    <Header icon='payment' content='Send exactly 1000BTC to this address' />
    <Modal.Content>
      <Grid centered>
        <Grid.Column width={10}>
          <Qr />
          <p>{'13W7JGnycCzLLWYg2dqJw8ZcnLFtjh7wsU'}</p>
        </Grid.Column>
      </Grid>
    </Modal.Content>
    <Modal.Actions>
      {props.qrButton}
    </Modal.Actions>
  </Modal>
)

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
      seller: '',
      isPaid: false
    }
    this.checkPayment = this.checkPayment.bind(this);
  }

  componentDidMount() {
    var context = this;
    axios.get('/api/v1/product', {
      params: {
        id: this.props.params.postId
      }
    })
    .then(function (response) {
      console.log(response.data);
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
  }

  checkPayment() {
    var context = this;
    var pulling = () => {
      axios.get('/api/v1/payment', {
          params: {
            id: context.state.thisProduct.id
          }
        })
        .then(function (response) {
          console.log(response);
          if (response.data.paid === true) {
            clearInterval(intervalID);
            context.setState({isPaid: true})
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    var intervalID = window.setInterval(pulling, 2000);

  }

  render() {
    var dimmer = !this.state.uber.dropoff_eta;
    const isPaid = this.state.isPaid;
    var qrButton;
    if (isPaid) {
      qrButton = <Button color='green'>
                   Your Payment confirmed
                 </Button>
    } else {
      qrButton = <Button color='grey'>
                   <Loader active inline /> Waing for Payment
                 </Button>
    }
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
                <ModalExampleCloseIcon qrButton={qrButton}checkPayment={this.checkPayment}/> 
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




