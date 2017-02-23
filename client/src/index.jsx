import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Home from './containers/Home.jsx';
import Category from './containers/Category.jsx';
import Login from './containers/Login.jsx';
import itemDetail from './containers/itemDetail.jsx';
import PostItem from './containers/PostItem.jsx';
import Signup from './containers/Signup.jsx';
import Profile from './containers/Profile.jsx';
//from App.jsx

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

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component = {Home} />
      <Route path="login" component={Login}/>
      <Route path="signup" component={Signup}/>
      <Route path="x/:category" component={Category}/>
      <Route path="i/:postId" component={itemDetail}/>
      <Route path="u/:userId" component={Profile}/>      
      <Route path="post" component={PostItem}/>
    </Route>
  </Router>,
  document.getElementById('app')
);