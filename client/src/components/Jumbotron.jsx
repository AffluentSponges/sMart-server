import React from 'react';
import { Link } from 'react-router';
import { Segment, Divider, Grid } from 'semantic-ui-react'
class Jumbotron extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Segment className='jumbotron'>
        <Grid centered>
          <Grid.Column>
          hahhoho
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}


export default Jumbotron;