import React, { Component } from 'react'
import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Grid } from 'semantic-ui-react'

import Autocomplete from '../components/Autocomplete.jsx'

const categories = [
  'Fashion and Accessories',
  'Home and Garden',
  'Electronics',
  'Baby and Child',
  'Cars and Motors',
  'Sports, Leisure and Games',
  'Movies, Books and Music',
  'Other'
];

//{ key: 'hat', text: 'Hat', value: 'hat' }

const products = categories.map(function(category) {
  return { key: category, text: category, value: category };
});

class PostItem extends Component {
  constructor(props) {
    super(props)
    this.state = { formData: {} }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  handleChange(e, { value }) {
    this.setState({ value })
  }

  handleSubmit(e, { formData }) {
    e.preventDefault()
    this.setState({ formData })
  }

  componentDidMount() {
    // get users gps location
    // var options = {
    //   enableHighAccuracy: true,
    //   timeout: 5000,
    //   maximumAge: 0
    // };
    // function success(pos) {
    //   var crd = pos.coords;

    //   console.log('Your current position is:');
    //   console.log(`Latitude : ${crd.latitude}`);
    //   console.log(`Longitude: ${crd.longitude}`);
    //   console.log(`More or less ${crd.accuracy} meters.`);
    // };
    // function error(err) {
    //   console.warn(`ERROR(${err.code}): ${err.message}`);
    // };
    // navigator.geolocation.getCurrentPosition(success, error, options);

  }

  onFocus() {

      console.log('hoho')

  }


  render() {
    const { formData, value } = this.state
    return (
      <Grid centered>
        <Grid.Column width={10}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Input label='Title' name='title' placeholder='Title' />
            </Form.Group>
            <Form.Field>
              <label>Autocomplete Address</label>
              <Autocomplete name='autocomplete'/>
            </Form.Field>
            <Form.Select label='Category' name='category' options={products} placeholder='Choose category...' search />
            <Form.TextArea name='details' label='Details' placeholder='Anything else we should know?(optinal)' rows='3' />
            <Button primary type='submit'>Show me the money!</Button>

            <Message>
              <pre>formData: {JSON.stringify(formData, null, 2)}</pre>
            </Message>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default PostItem;



          //  <Form.Group widths='equal'>
          //    <Form.Input label='Address1' name='address1' placeholder='Address1' />
          //    <Form.Input label='Address2' name='address2' placeholder='Address2' />
          //    <Form.Input label='Zip code' name='zipcode' placeholder='Zip code' />
          //  </Form.Group>
