import React from 'react';
import CategoriesNav from '../components/CategoriesNav.jsx';
import ItemList from '../components/ItemList.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CategoriesNav state={this.props.state} currentCategoryHandler={this.props.currentCategoryHandler}/>
        <ItemList items={this.props.items}/>
      </div>
    );
  }
}


export default Home;