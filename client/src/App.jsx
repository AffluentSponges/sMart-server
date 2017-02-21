import React from 'react';

import Header from './components/Header.jsx';
import CategoriesNav from './components/CategoriesNav.jsx';
import ItemElement from './components/ItemElement.jsx';
import ItemList from './components/ItemList.jsx';
import data from './data.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currentCategory:'',
      items: []
    }
    this.currentCategoryHandler = this.currentCategoryHandler.bind(this);
  }

  componentDidMount() {
    this.setState({items: data.home});
  }

  currentCategoryHandler(category) {
    this.setState({currentCategory: category});
    this.setState({items: data[category]});
    console.log('currentCategory is changed to ', category)
  }

  render() {
    return (
      <div>
        <Header items={this.state.items}/>
        {React.cloneElement(this.props.children, {
          items: this.state.items,
          currentCategoryHandler: this.currentCategoryHandler
        })}
      </div>
    );
  }
}


export default App;