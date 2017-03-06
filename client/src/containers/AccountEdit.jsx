import React from 'react';
import { browserHistory } from 'react-router'
import { Header, Icon, Image, Button, Container, Menu, Segment, Divider, Grid, Form, Message } from 'semantic-ui-react'
import axios from 'axios';
import WAValidator from 'wallet-address-validator';
 


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
    var context = this;
    e.preventDefault()
    var valid = WAValidator.validate(formData.wallet_address, 'bitcoin');
    if(valid) {
      console.log('This is a valid address');
      formData.id = this.props.state.user.id;
      axios.post('/api/v1/postcontactinfo', formData)
        .then(function (response) {
          console.log('response.data', response.data);
          browserHistory.push(`/u/${context.props.state.user.id}/selling`);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      window.alert('BITCOIN WALLET ADDRESS IS INVALID')
      console.log('Address INVALID');
    }
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
                <Form.Input label='Address 1' name='address' placeholder='922 folsom' required/>
                <Form.Input label='Address2' name='address_2' placeholder='#153' />
                <Form.Input label='Zip' name='postal_code' placeholder='zip' required/>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input label='BITCOIN WALLET ADDRESS' name='wallet_address' placeholder='1DRjzNVA8CsLAL74TdsZvk6ezdvPPtixhW' required/>
                <Form.Input label='PHONE' name='phone_number' placeholder='415-4324-2345' required/>
              </Form.Group>
              <Button primary type='submit'>Save</Button>
            </Form>
          </Grid.Column>       
        </Container>
      </div>
    );
  }
}

export default AccountEdit;