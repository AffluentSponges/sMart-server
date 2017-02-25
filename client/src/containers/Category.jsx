import React from 'react';
import CategoriesNav from '../components/CategoriesNav.jsx';
import ItemList from '../components/ItemList.jsx';
import axios from 'axios';

class Category extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   items:[]
    // }
  }

  componentDidMount() {
  //   var context = this;
  //   axios.get('/api/v1/products')
  //   .then(function (response) {
  //     console.log(response.data)
  //     var thisCategory = response.data.filter((item)=>{
  //       return item.category_id === parseInt(context.props.params.category);
  //     });
  //     context.setState({items: thisCategory})
  //     console.log('this.state.items', context.state.items);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   }); 
  }

  render() {

    return (
      <div>
        <CategoriesNav state={this.props.state} currentCategoryHandler={this.props.currentCategoryHandler}/>
        <ItemList items={this.props.state.currentCategoryItems}/>
      </div>
    );
  }
}

export default Category;