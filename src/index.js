import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  HashRouter,
  Route,
  // BrowserRouter,
  Redirect
  // Link,
  // Switch
} from 'react-router-dom';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
// import { CSSTransitionGroup } from 'react-transition-group'
import './index.css';
import './style/index.less';
import  Home  from './page/Home';
import  Login  from './page/Login';
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()
const location = history.location

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount(){
    if(location.hash === '#/'||location.hash ==='' ){
      window.location.href='#/login' ;
    }
  }
  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}>
        <HashRouter>
          <div className="contain">
            <Route path="/login" component={Login} key={location.key}></Route>
            <Route path="/admin" component={Home} key={location.key}></Route>
            {/* {location.hash === '#/'||location.hash ==='' ? <Redirect to='login' /> : ''} */}
            {this.props.children}
          </div>
        </HashRouter>
      </ReactCSSTransitionGroup>
    );
  }
}


ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
