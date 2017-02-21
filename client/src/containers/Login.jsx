import React from 'react';
import { Button, Icon, Grid, Divider, Checkbox, Form } from 'semantic-ui-react';
import { Link } from 'react-router';

const ButtonExampleConditionals = () => (
  <Button.Group>
    <Button as={Link} to='/signup'>Sign Up</Button>
    <Button positive>Log In</Button>
  </Button.Group>
)

const FormExampleForm = () => (
  <Form>
    <Form.Field>
      <label>Email</label>
      <input placeholder='Email' />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='Password' />
    </Form.Field>
    <Button type='submit' className='socialLogin' color='instagram'>Log in</Button>
  </Form>
)

class Login extends React.Component {
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
            <Icon name='facebook' /> Login with Facebook 
          </Button>
        </Grid.Row>
        <Grid.Row>
          <Button color='twitter' className='socialLogin'>
            <Icon name='twitter' /> Login with Twitter
          </Button>
        </Grid.Row>
        <Grid.Row>
          <Button color='google plus' className='socialLogin'>
            <Icon name='google plus' /> Login with Google
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


export default Login;