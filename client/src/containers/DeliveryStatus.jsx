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
        { active: false, completed: true, icon: 'credit card', title: 'buyer_paid', description: 'Blah Blah' },
        { active: false, completed: false, icon: 'truck', title: 'en_route_to_pickup', description: 'Blah Blah' },
        { active: false, completed: false, icon: 'truck', title: 'at_pickup', description: 'Blah Blah' },
        { active: false, completed: false, icon: 'truck', title: 'en_route_to_dropoff', description: 'Blah Blah' },
        { active: false, completed: false, icon: 'truck', title: 'at_dropoff', description: 'Blah Blah' },
        { active: false, completed: false, icon: 'credit card', title: 'completed', description: 'Blah Blah' }
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
    var previous;
    var steps = this.state.steps.map((step) => {
      if (step.title === status) {
        step.completed = true
      }
      return step;
    });
    this.setState({steps: steps})

  }



  render() {

    return (
      <Grid centered>
        <Grid.Column width={10}>
          <Segment>
              <Image src={this.state.item.image_links[0]} size='medium' centered/>
              <p className='description'>
                <strong>Discription</strong><br/>
                {this.state.item.description}
              </p>
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Step.Group vertical items={this.state.steps} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default DeliveryStatus;
