import React from 'react';
import { Link } from 'react-router';
import { Dimmer, Loader, Grid, Image, Segment, Divider, Button, Container, Header, Icon, Modal, Input } from 'semantic-ui-react'
import axios from 'axios';
import ReactSVG from 'react-svg'
import Qr from '../components/Qr.jsx'
import qr from 'qr-image';

const LoaderExampleInline = () => (
  <Loader active inline />
)
//<Icon name='checkmark' />
const LoaderForBTC = () => (
  <Loader active inline />
)
const ModalExampleCloseIcon = (props) => (
  <Modal size='small' trigger={<Button size='huge' className='buy' color='red' onClick={props.checkPayment}>
                    {props.buttonText}
                  </Button>} closeIcon='close'>
    {props.btc.length > 0 ? 
      <Header icon='payment' content={`Send exactly ${props.btc}BTC to this address`} />
      :<Header icon='payment' content={`Send exactly ${'0.0'}BTC to this address`}></Header>}
    <Modal.Content>
      <Grid centered>
        <Grid.Column width={10}>
          <Qr qr_svg={props.qr_svg}/>
          <p>{props.bitcoin_address}</p>
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
      isPaid: false,
      wallet: '13W7JGnycCzLLWYg2dqJw8ZcnLFtjh7wsU',
      currentBTC: ''
    }
    this.checkPayment = this.checkPayment.bind(this);
  }

  componentDidMount() {
    // get users gps location
    var context = this;
    axios.get('/api/v1/product', {
      params: {
        id: this.props.params.postId
      }
    })
    .then(function (response) {
      console.log('/api/v1/product', response.data);
      context.setState({thisProduct: response.data});
      axios.get('/api/v1/getuserprofile', {
          params: {
            id: response.data.seller_id
          }
        })
        .then(function (response) {
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
      console.log(response.data);
      context.setState({uber: response.data});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  checkPayment() {
    var context = this;
    var intervalID;
    axios.post('/api/v1/attempt_purchase', {
        product_id: context.state.thisProduct.id,
        buyer_id: context.props.state.user.id
      })
      .then(function (response) {
        console.log('/api/v1/attempt_purchase', response.data);
        if (response.data.status === 'pending') {
          console.log('response.data.status === pending');
          context.setState({currentBTC: response.data.BTC})
          intervalID = window.setInterval(pulling, 2000);
        } else {

        }
      })
      .catch(function (error) {
        console.log(error);
      });

    var pulling = () => {
      axios.get('/api/v1/payment', {
          params: {
            id: context.state.thisProduct.id,
            buyer_id: context.props.state.user.id
          }
        })
        .then(function (response) {
          if (response.data.paid === true) {
            clearInterval(intervalID);
            context.setState({isPaid: true})
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    const qr_svg = qr.svgObject(this.state.wallet).path;
    const bitcoin_address = this.state.thisProduct.bitcoin_address;
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



    if (this.state.thisProduct.buyer_id) {
      var buyButton = <Button size='huge' className='buy' color='grey'>
                        Sold out
                      </Button> 
    } else if (this.state.thisProduct.attempted_buyer_id) {
      if (this.state.thisProduct.attempted_buyer_id === this.props.state.user.id) {
        var buyButton = <ModalExampleCloseIcon bitcoin_address={bitcoin_address} btc={this.state.currentBTC} qr_svg={qr_svg} qrButton={qrButton} checkPayment={this.checkPayment} buttonText='Wating for payment'/>
      } else {
        var buyButton = <Button size='huge' className='buy' color='grey'>
                          Sale Pending
                        </Button>
      }
    } else if (this.props.state.loggedIn) {
      var buyButton = <ModalExampleCloseIcon bitcoin_address={bitcoin_address} btc={this.state.currentBTC} qr_svg={qr_svg}qrButton={qrButton} checkPayment={this.checkPayment}  buttonText='Buy now!'/> 
    } else {
      var buyButton = <a href='/login'>
                        <Button size='huge' className='buy' color='red'> Buy now! </Button>
                      </a>
    }

    if (this.props.state.loggedIn) {
      var uberDetail = <Container>
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
    } else {
      var uberDetail = <Container>
                          <Grid.Row>
                            <h2>Login is required for checking </h2>
                            <h2>UberRUSH fee and ETA</h2>
                          </Grid.Row>   
                        </Container>
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
              {uberDetail}                      
              <Grid.Row>
                {buyButton}
              </Grid.Row>
            </Grid>
          </Segment>
          <Divider horizontal>ABOUT THE SELLER</Divider>
          <Segment>
            <Grid.Row>
              <h3>{this.state.seller.first_name + ' ' + this.state.seller.last_name}</h3>
            </Grid.Row>
            <Grid.Row>
              <Button size='medium' className='buy' color='green'>
                Chat with {this.state.seller.first_name}
              </Button> 
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




