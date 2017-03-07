import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Grid, Image } from 'semantic-ui-react'

import Autocomplete from '../components/Autocomplete.jsx'
import FileUpload from '../components/FileUpload.jsx'
import axios from 'axios';

class PostItem extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      formData: {
        title: '',
        category: ''
      },
      image_links: [],
      categories: [],
      fetching: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.handleImageUrl = this.handleImageUrl.bind(this);
    this.handleCategoriesChange = this.handleCategoriesChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount(){
    console.log("componentWillMount", this.props.state);
    if (!this.props.state.loggedIn) {
      browserHistory.push('/login');
    }
  }

  handleChange(e, { value }) {
    console.log(value);
    this.setState({ formData: {title: value }})
  }

  handleCategoriesChange(e, { value }) {
    console.log(value);
    this.setState({ formData: {category: value }})
    // var categoryText = this.state.categories.filter((category) => {
    //     return category.value === value;
    //   })[0].text;
    // this.setState({ 
    //   formData: {category: value },
    //   category: categoryText
    // })
  }  

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(name, value);
    this.setState({
      formData: {
        [name]: value 
      }
    });
  }

  handleSubmit(e, { formData }) {
    e.preventDefault()
    var data = {};
    data.seller_id = this.props.state.user.id;
    data.title = formData.title;
    data.image_links = this.state.image_links;
    data.description = formData.details;
    data.category_id = formData.category;
    data.address = formData.address;
    data.address_2 = formData.address_2;
    data.asking_price = parseFloat(formData.price);
    data.postal_code = formData.postal_code;
    console.log('before send', data);
    axios.post('/api/v1/postitem', data)
      .then(function (response) {
        browserHistory.push(`/i/${response.data.id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleImageUrl(url){
    var context = this;
    var image_links = this.state.image_links.slice();
    image_links.push(url);
    this.setState({image_links: image_links});

    // axios.get('/api/v1/vision', {
    //     params: {
    //       image_links: url
    //     }
    //   })
    //   .then(function (response) {
    //     console.log(response.data);
    //     context.setState({ formData: {title: response.data.captions }});
    //     context.setState({ formData: {category: response.data.category_id }}); //category_id
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  componentDidMount() {
    var context = this;
    var categories = this.props.state.categories.map(function(category) {
      return { key: category.id, text: category.name, value: category.id };
    });
    axios.get('/api/v1/getuserprofile', {
        params: {
          id: context.props.state.user.id
        }
      })
      .then(function (response) {
        console.log(response.data);
        context.setState({ 
          formData: {
            address: response.data.address,
            address_2: response.data.address_2,
            postal_code: response.data.postal_code 
          },
          categories: categories
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onFocus() {
  }

  render() {
    const { formData, value } = this.state
    let image = null;
    let src = 'http://react.semantic-ui.com/assets/images/wireframe/image.png'
    // if (this.state.image_links) {
    //   src = this.state.image_links;
    // }
    return (
      <Grid centered>
        <Grid.Row>
          <FileUpload handleImageUrl={this.handleImageUrl}/>  
        </Grid.Row>
        <Grid.Row>
          <Image.Group size='small'>
            {this.state.image_links[0] ? <Image src={this.state.image_links[0]} /> : <Image src={src} bordered/>}
            {this.state.image_links[1] ? <Image src={this.state.image_links[1]} /> : <Image src={src} bordered/>}
            {this.state.image_links[2] ? <Image src={this.state.image_links[2]} /> : <Image src={src} bordered/>}
            {this.state.image_links[3] ? <Image src={this.state.image_links[3]} /> : <Image src={src} bordered/>}
          </Image.Group>         
        </Grid.Row>
        <Grid.Column width={11}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Input label='Title' name='title' placeholder='Title' value={this.state.formData.title} onChange={this.handleChange} required/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input label='Address 1' name='address' placeholder='922 folsom' value={this.state.formData.address} onChange={this.handleInputChange} required/>
              <Form.Input label='Address2' name='address_2' placeholder='#153' value={this.state.formData.address_2} onChange={this.handleInputChange} />
              <Form.Input label='Zip' name='postal_code' placeholder='94107' value={this.state.formData.postal_code} onChange={this.handleInputChange} required/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select label='Category' name='category' value={this.state.formData.category} onChange={this.handleCategoriesChange} options={this.state.categories} placeholder='Choose category...' required/>
              <Form.Input label='Price' name='price' placeholder='$0' required/>
            </Form.Group>
            <Form.TextArea name='details' label='Details' placeholder='Anything else we should know?(optinal)' rows='3' />
            <Button primary type='submit'>Show me the money!</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

export default PostItem;

            // <Message>
              // <pre>formData: {JSON.stringify(this.state, null, 2)}</pre>
            // </Message>


            //<Form.Field>
            //  <label>Autocomplete Address</label>
            //  <Autocomplete name='autocomplete'/>
            //</Form.Field>

          //  <Form.Group widths='equal'>
          //    <Form.Input label='Address1' name='address1' placeholder='Address1' />
          //    <Form.Input label='Address2' name='address2' placeholder='Address2' />
          //    <Form.Input label='Zip code' name='zipcode' placeholder='Zip code' />
          //  </Form.Group>
