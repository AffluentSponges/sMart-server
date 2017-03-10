import React from 'react'
import { Icon, Step, Grid, Segment, Image } from 'semantic-ui-react'
import axios from 'axios';

class DeliveryStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        image_links: [],
        description: ''
      },
      steps: [
        { active: false, completed: true, icon: 'credit card', title: 'Buyer paid', status: 'buyer_paid'},
        { active: false, completed: false, icon: 'truck', title: 'En route to pickup', status: 'en_route_to_pickup'},
        { active: false, completed: false, icon: 'truck', title: 'At pickup', status: 'at_pickup', description: 'Blah Blah'},
        { active: false, completed: false, icon: 'truck', title: 'En route to dropoff', status: 'en_route_to_dropoff'},
        { active: false, completed: false, icon: 'truck', title: 'At dropoff', status: 'at_dropoff'},
        { active: false, completed: false, icon: 'credit card', title: 'Completed', status: 'completed'}
      ],
      intervalID: ''
    };
    this.pulling = this.pulling.bind(this);
  }

  componentDidMount() {
    console.log(this.props.params.postId);
    var context = this;
    axios.get('/api/v1/product/getProductHistory', {
        params: {
          product_id: context.props.params.postId
        }
      })
      .then(function (response) {
        console.log('/api/v1/product/getProductHistory', response.data)
        var data = response.data.product;
        data.status = response.data.status;
        context.setState({item: data})
        var intervalID = window.setInterval(context.pulling, 2000);
        context.setState({intervalID: intervalID})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  pulling() {
    var context = this;
    axios.get('/api/v1/product/getProductHistory', {
        params: {
          product_id: context.props.params.postId
        }
      })
      .then(function (response) {
        var data = response.data.product;
        data.status = response.data.status;
        context.setState({item: data})
        context.handleSteps(data.status);
        if (data.status === 'completed') {
          clearInterval(context.state.intervalID);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSteps(status) {
    var index;
    var steps = this.state.steps;
    for (var i = 0; i < this.state.steps.length; i++) {
      if (this.state.steps[i].status === status) {
        index = i;
      }
    }
    for (var i = 0; i <= index; i++) {
      steps[i].completed = true;
    }
    this.setState({steps: steps})

  }



  render() {

    return (
      <Grid centered stackable  style={{'padding-top': '25px'}}>
        <Grid.Column width={8}>
          <Segment>
              <Image src={this.state.item.image_links[0]} size='medium' centered/>
              <p className='description'>
                <strong>Discription</strong><br/>
                {this.state.item.description}
              </p>
          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          <Step.Group fluid vertical items={this.state.steps} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default DeliveryStatus;
