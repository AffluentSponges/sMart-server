import React from 'react';
import { Grid, Image, Segment, Divider, Button } from 'semantic-ui-react'

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    let _this = this;
    let postId = this.props.params.postId;
    let itemObj = this.props.items.filter(function (item) {
      return item.postId == _this.props.params.postId;
    })[0];
    let temp = JSON.stringify(itemObj);
    return (
      <Grid centered>
        <Grid.Column width={10}>
          <Segment>
              <Image src={itemObj.imageUrls[0]} size='medium' centered/>
              <p className='description'>
                <strong>Description</strong><br/>
                {itemObj.description}
              </p>
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment>
            <Grid centered columns={2}>
              <Grid.Row>
                <h1>$180</h1>
              </Grid.Row>
              <Grid.Row>
                <h2>{itemObj.title}</h2>
              </Grid.Row>
              <Divider section />
              <Grid.Row>
                <Button size='huge' className='buy' color='red'>
                  Buy now!
                </Button>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>

    );
  }
}


export default ItemDetail;



      // <Grid centered>
      //   <Grid.Column width={10}>
      //     <Image src={itemObj.imageUrls[0]} />
      //     {itemObj.description}
      //   </Grid.Column>
      //   <Grid.Column width={6}>
      //     $180

      //     {temp}
      //   </Grid.Column>
      // </Grid>