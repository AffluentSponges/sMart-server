import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Home from './containers/Home.jsx';
import Category from './containers/Category.jsx';
import Login from './containers/Login.jsx';
import itemDetail from './containers/ItemDetail.jsx';
import PostItem from './containers/PostItem.jsx';
import Signup from './containers/Signup.jsx';
import Profile from './containers/Profile.jsx';
import AccountEdit from'./containers/AccountEdit.jsx';
import DeliveryStatus from'./containers/DeliveryStatus.jsx';

//from App.jsx

import Header from './components/Header.jsx';
import CategoriesNav from './components/CategoriesNav.jsx';
import CategoriesNav2 from './components/CategoriesNav2.jsx';
import ItemElement from './components/ItemElement.jsx';
import ItemList from './components/ItemList.jsx';
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
      currentCategoryName: '',
      items: [],
      currentCategoryItems:[],
      searchData: []
    }
    this.currentCategoryHandler = this.currentCategoryHandler.bind(this);
  }

  componentDidMount() {
    var _this = this;
    axios.get('/users/auth')
    .then((res) => {
      // console.log(res.data.passport.user);
      if (res.data.passport) {
        if (res.data.passport.user.id) {
            console.log('res.data.passport.user', res.data.passport.user);
          _this.setState({
            user: {
              id: res.data.passport.user.id,
              first_name: res.data.passport.user.first_name
            },
            loggedIn: true
          }); 
        }        
      }
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
      console.log(response.data);
      _this.setState({items: response.data})
      var searchData = response.data.map(({title, asking_price, description, image_links, id}) => {
        return {
          title: title,
          description: description.slice(0, 15) + '...',
          image: image_links[0],
          price: "$" + asking_price,
          id: id,
          childKey: id
        };
      });
      console.log();
      console.log();
      _this.setState({searchData: searchData});
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
    this.setState({currentCategoryName: categoryName});
    var thisCategoryItems = this.state.items.filter((item)=>{
      //console.log(typeof item.category_id, typeof currentCategoryId)
      return item.category_id === currentCategoryId;
    });
    this.setState({currentCategoryItems: thisCategoryItems});  
    console.log('currentCategory', this.state.currentCategory);
    console.log('currentCategoryName', this.state.currentCategoryName);

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
        <Header appState={this.state} searchData={this.state.searchData} loggedIn={this.state.loggedIn} logout={this.logout} axiosSignin={this.axiosSignin}/>
        <div className='space'></div>
        {React.cloneElement(this.props.children, {
          items: this.state.items,
          searchData: this.state.searchData,
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
      <IndexRoute component = {Home}/>
      <Route path="login" component={Login}/>
      <Route path="signup" component={Signup}/>
      <Route path="x/:category" component={Category}/>
      <Route path="i/:postId" component={itemDetail}/>
      <Route path="u/:userId/:activeItem" component={Profile}/>
      <Route path="h/:postId" component={DeliveryStatus}/>              
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


// var options = {
//   enableHighAccuracy: true,
//   timeout: 10000,
//   maximumAge: 0
// };
// function success(pos) {
//   var crd = pos.coords;
//   axios.post('/api/v1/dev', {
//       Latitude: crd.latitude,
//       Longitude: crd.longitude,
//       accuracy_meters: crd.accuracy
//     })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   console.log('Your current position is:');
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
// };
// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// };
// navigator.geolocation.getCurrentPosition(success, error, options);


