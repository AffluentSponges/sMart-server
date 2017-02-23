import React from 'react';
import CategoriesNav from '../components/CategoriesNav.jsx';
import ItemList from '../components/ItemList.jsx';

class Category extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
      <CategoriesNav currentCategoryHandler={this.props.currentCategoryHandler}/>
      <ItemList items={this.props.items}/>
      {this.props.params.category}
      </div>
    );
  }
}


export default Category;