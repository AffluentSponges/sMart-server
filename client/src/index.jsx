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
import auth from './auth/auth.js'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      categories: [],
      currentCategory:'',
      items: []
    }
    this.currentCategoryHandler = this.currentCategoryHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.axiosSignin = this.axiosSignin.bind(this);
  }

  componentDidMount() {
    this.setState({items: data.home});
    this.setState({loggedIn: auth.loggedIn()});
    console.log('loggedIn?: ', this.state.loggedIn);
  }

  currentCategoryHandler(category) {
    this.setState({currentCategory: category});
    this.setState({items: data[category]});
    console.log('currentCategory is changed to ', category)
  }

  logout() {
    auth.logout()
    this.props.router.replace('/')
  }

  axiosSignin() {
    axios.get('/login')
    .then(function(res) {
      console.log(res.token)
    })
    .catch(this.setError);
  }

  render() {
    return (
      <div>
        <Header items={this.state.items} loggedIn={this.state.loggedIn} logout={this.logout} axiosSignin={this.axiosSignin}/>
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