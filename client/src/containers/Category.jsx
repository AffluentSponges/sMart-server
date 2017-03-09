import React from 'react';
import CategoriesNav from '../components/CategoriesNav.jsx';
import ItemList from '../components/ItemList.jsx';
import axios from 'axios';
import Jumbotron from '../components/Jumbotron.jsx';
import CategoriesNav2 from '../components/CategoriesNav2.jsx';

class Category extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {

    return (
      <div>
        <CategoriesNav2 state={this.props.state} currentCategoryHandler={this.props.currentCategoryHandler}/>
        <Jumbotron searchData={this.props.searchData}/>
        <ItemList items={this.props.state.currentCategoryItems} state={this.props.state} currentCategoryHandler={this.props.currentCategoryHandler}/>
      </div>
    );
  }
}

export default Category;