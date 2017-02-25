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
import AccountEdit from'./containers/AccountEdit.jsx';

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
      user: '',
      categories: [],
      currentCategory:'',
      items: [],
      currentCategoryItems:[]
    }
    this.currentCategoryHandler = this.currentCategoryHandler.bind(this);
    // this.logout = this.logout.bind(this);
    // this.axiosSignin = this.axiosSignin.bind(this);
  }

  componentDidMount() {
    var _this = this;
    axios.get('/users/auth')
    .then((res) => {
      // console.log(res.data.passport.user);
      if (res.data.passport) {
        if (res.data.passport.user.id) {
          _this.setState({
            user: {
              id: res.data.passport.user.id,
              first_name: res.data.passport.user.first_name
            },
            loggedIn: true
          }); 
        }        
      }
      // console.log('App.state = ', _this.state);
    })
    .catch((err) => {
      console.log('err', err);
    });

    axios.get('/api/v1/categories')
    .then(function (response) {
      _this.setState({categories: response.data})
      // console.log('this.state.categories', _this.state.categories);
    })
    .catch(function (error) {
      console.log(error);
    }); 

    axios.get('/api/v1/products')
    .then(function (response) {
      //console.log(response.data)
      _this.setState({items: response.data})
      //console.log('this.state.items', _this.state.items);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  currentCategoryHandler(categoryName) {
    var currentCategoryId = this.state.categories.filter((category)=>{
      return category.name === categoryName;
    })[0].id;
    this.setState({currentCategory: currentCategoryId});
    var thisCategoryItems = this.state.items.filter((item)=>{
      //console.log(typeof item.category_id, typeof currentCategoryId)
      return item.category_id === currentCategoryId;
    });
    this.setState({currentCategoryItems: thisCategoryItems});  
    console.log('currentCategory', this.state.currentCategory);
    // console.log('thisCategoryItems ', currentCategoryId, this.state.currentCategoryItems)
  }

  // logout() {
  //   auth.logout()
  //   this.props.router.replace('/')
  // }

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
        <Header appState={this.state} items={this.state.items} loggedIn={this.state.loggedIn} logout={this.logout} axiosSignin={this.axiosSignin}/>
        {React.cloneElement(this.props.children, {
          items: this.state.items,
          currentCategoryHandler: this.currentCategoryHandler,
          state: this.state
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
      <Route path="account-edit" component={AccountEdit}/>
    </Route>
  </Router>,
  document.getElementById('app')
);

const asynchronous = () => {};

const authCheck = (nextState, replace, asynchronous) => {
  axios.get('/users/auth')
  .then(res => {
    console.log('authCheck', !!res.data.passport)
    if (!!res.data.passport) {
      replace('/login')
    }
    callback();
  })
  .catch(error => {
    // do some error handling here
    callback(error);
  })
}


// browserHistory.push(`/i/${response.data}`);
//     axios.get('/users/auth')
//     .then((res) => {
//       // console.log(res.data.passport.user);
//       if (res.data.passport) {
//         if (res.data.passport.user.id) {
//           _this.setState({
//             user: {
//               id: res.data.passport.user.id,
//               first_name: res.data.passport.user.first_name
//             },
//             loggedIn: true
//           }); 
//         }        
//       }
//       console.log('App.state = ', _this.state);
//     })
//     .catch((err) => {
//       console.log('err', err);
//     });



