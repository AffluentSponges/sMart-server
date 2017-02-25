import React from 'react';
import { Grid, Image, Segment, Divider, Button } from 'semantic-ui-react'
import axios from 'axios';

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thisProduct: '',
      products: ''
    }
  }

  componentDidMount() {
    var context = this;
    axios.get('/api/v1/product', {
        params: {
          id: this.props.params.postId
        }
      })
      .then(function (response) {
        console.log(response);
        context.setState({thisProduct: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    // let _this = this;
    // let postId = this.props.params.postId;
    // let itemObj = this.props.items.filter(function (item) {
    //   return item.postId == _this.props.params.postId;
    // })[0];
    // let temp = JSON.stringify(itemObj);
    var imgSrc;
    if (this.state.thisProduct.image_links) {
      imgSrc = this.state.thisProduct.image_links[0];
    } else {
      imgSrc = ''
    }
    return (
      <Grid centered>
        <Grid.Column width={10}>
          <Segment>
              <Image src={imgSrc} size='medium' centered/>
              <p className='description'>
                <strong>Discription</strong><br/>
                {this.state.thisProduct.description}
              </p>
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment>
            <Grid centered columns={2}>
              <Grid.Row>
                <h1>${this.state.thisProduct.asking_price}</h1>
              </Grid.Row>
              <Grid.Row>
                <h1>urber rush fee</h1>
              </Grid.Row>
              <Grid.Row>
                <h2>{this.state.thisProduct.title}</h2>
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


    // axios.get('/api/v1/getuserproducts', {
    //     params: {
    //       user_id: this.props.state.user.id
    //     }
    //   })
    //   .then(function (response) {
    //     console.log('ItemDetail response ',response);
    //     var products = response.data;
    //     var thisProduct = response.data.filter((product)=>{return product.id === parseInt(_this.props.params.postId)})[0];
    //     console.log(products, thisProduct);
    //     _this.setState({
    //       thisProduct: thisProduct,
    //       products: products 
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });  











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