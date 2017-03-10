import React from 'react';
import { Link } from 'react-router';
import { Segment, Divider, Grid, Menu } from 'semantic-ui-react'
import Search from './Search.jsx'
import Dimensions from 'react-dimensions'

class Jumbotron extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.containerWidth < 1000) {
      return (
        <div>
          <div className='jumbotron'>
            <Grid centered>
              <Grid.Column width='16'>
                <h1>BARGAIN DEALS IN SF,</h1>
                <h1><span style={{'color': '#DC2022'}}>DELIVERED</span> TO YOUR DOOR INSTANTLY</h1>
              </Grid.Column>         
            </Grid>
            <Grid centered columns={1}>
              <Grid.Column>
                <Search searchData={this.props.searchData} size='large' className='search'/>
              </Grid.Column>  
            </Grid> 
          </div>
          <div className='space'></div>
        </div>
      );
    }
    return (
      <div className='jumbotron'>
        <div className='space'></div>
        <Grid centered>
          <Grid.Column width='12'>
            <h1>BARGAIN DEALS IN SF,</h1>
            <h1 style={{'color': '#DC2022'}}>DELIVERED</h1>
            <h1>TO YOUR DOOR INSTANTLY</h1>
          </Grid.Column>
          <Grid.Row centered columns={3}>
            <Grid.Column> 
            </Grid.Column>
            <Grid.Column width={4}>
              <Search searchData={this.props.searchData} size='huge' className='search'/>
            </Grid.Column>
            <Grid.Column> 
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className='space'></div>
      </div>
    );
  }
}


export default Dimensions()(Jumbotron);