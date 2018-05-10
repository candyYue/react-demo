import React from 'react'
import {
  Router,
  Route,
  Link,
  Redirect,
  HashRouter,
} from 'react-router-dom';
import Companymanage from "../page/Companymanage"
import Systemsetting from "../page/Systemsetting"
import Systemlog from "../page/Systemlog"
import Calllist from '../page/Calllist';
import Otherpage from '../page/Otherpage';
import Audio from '../page/Audio';
import  Login  from '../page/Login';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()
const location = history.location
console.log(location)
const routes = (
  // <ReactCSSTransitionGroup
  //       transitionName="fade"
  //       transitionAppear={true} 
  //       transitionAppearTimeout={500}
  //       transitionEnterTimeout={300}
  //       transitionLeaveTimeout={300}>
    <HashRouter>
      <div>
        <Route path="/admin/Companymanage" component={Companymanage} key={location.key}/>
        <Route path="/admin/systemsetting" component={Systemsetting} key={location.key}/>
        <Route path="/admin/Systemlog" component={Systemlog} key={location.key}/>
        <Route path="/admin/audio" component={Audio} key={location.key}/>
        <Route path="/admin/otherpage" component={Otherpage} key={location.key}/>
        <Route path="/admin/calllist/:id" component={Calllist} key={location.key}/>
      </div>
    </HashRouter> 
  // </ReactCSSTransitionGroup>
)

export default routes