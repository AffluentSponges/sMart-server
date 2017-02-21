import React from 'react';
import { Button, Icon, Grid, Divider, Checkbox, Form } from 'semantic-ui-react';
import { Link } from 'react-router';

const ButtonExampleConditionals = () => (
  <Button.Group>
    <Button positive>Sign Up</Button>
    <Button as={Link} to='/login'>Log In</Button>
  </Button.Group>
)

const FormExampleForm = () => (
  <Form>
    <Form.Field>
      <label>Full Name</label>
      <input placeholder='Full Name' className='socialLogin'/>
    </Form.Field>
    <Form.Field>
      <label>Email</label>
      <input placeholder='Email' />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='Password' />
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='submit' className='socialLogin' color='instagram'>Sign Up</Button>
  </Form>
)

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <Divider horizontal><ButtonExampleConditionals /></Divider>
      <Grid centered columns={2}>
        <Grid.Row>
          <Button color='facebook' className='socialLogin'>
            <Icon name='facebook' /> Sign Up with Facebook 
          </Button>
        </Grid.Row>
        <Grid.Row>
          <Button color='twitter' className='socialLogin'>
            <Icon name='twitter' /> Sign Up with Twitter
          </Button>
        </Grid.Row>
        <Grid.Row>
          <Button color='google plus' className='socialLogin'>
            <Icon name='google plus' /> Sign Up with Google
          </Button>
        </Grid.Row>
      </Grid>
      <Divider horizontal>Or</Divider>
      <Grid centered columns={2}>
        <Grid.Row>
          <FormExampleForm />
        </Grid.Row>
      </Grid>      
    </div> 
    );
  }
}


export default SignUp;