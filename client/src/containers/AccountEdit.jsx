import React from 'react';
import { browserHistory } from 'react-router'
import { Header, Icon, Image, Button, Container, Menu, Segment, Divider, Grid, Form, Message } from 'semantic-ui-react'
import axios from 'axios';

class AccountEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      formData: {},
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e, { formData }) {
    e.preventDefault()
    //this.setState({ formData })
    // var data = {};
    // data.address =
    // data.address_2 = 
    // data.phone = 
    console.log(formData);
    console.log(this.props.state.user.id);
    formData.id = this.props.state.user.id;
    axios.post('/api/v1/postcontactinfo', formData)
      .then(function (response) {
        console.log('response', response);
        // console.log(response.data.toString());
        // console.log(typeof '/i/' + response.data.toString())
        browserHistory.push('/u/1234123');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange(e, { value }) {
    console.log(value);
    this.setState({ value })
  }  

  render() {
    var { formData, value } = this.state
    return (
      <div>
        <Container textAlign='center'>
          <Header as='h2' icon textAlign='center'>
            <Icon name='users' circular />
            <Header.Content>
              {this.props.state.user.first_name}
            </Header.Content>
          </Header>
          <Button basic color='red'>
            Change Photo
          </Button>        
        </Container>
        <Divider />
        <Container textAlign='center' className=''>
          <Grid.Column width={8}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group widths='equal'>
                <Form.Input label='Address 1' name='address' placeholder='922 folsom' />
                <Form.Input label='Address2' name='address_2' placeholder='#153' />
                <Form.Input label='Zip' name='postal_code' placeholder='zip' />
              </Form.Group>
                <Form.Input label='PHONE' name='phone_number' placeholder='415-4324-2345' />
              <Button primary type='submit'>Save</Button>
            </Form>
          </Grid.Column>       
        </Container>
      </div>
    );
  }
}

export default AccountEdit;