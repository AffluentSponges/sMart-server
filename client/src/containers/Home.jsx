import React from 'react';
import CategoriesNav from '../components/CategoriesNav.jsx';
import ItemList from '../components/ItemList.jsx';
import Jumbotron from '../components/Jumbotron.jsx';
import CategoriesNav2 from '../components/CategoriesNav2.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CategoriesNav2 state={this.props.state} currentCategoryHandler={this.props.currentCategoryHandler}/>
        <Jumbotron />
        <ItemList items={this.props.items} state={this.props.state} currentCategoryHandler={this.props.currentCategoryHandler}/>
      </div>
    );
  }
}


export default Home;