import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ApiTest from './ApiTest';
import EchartMap from "./Map/EchartMap2";

const BasicRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ApiTest}/>
            <Route exact path="/apiTest/:id" component={ApiTest}/>
            <Route exact path="/echartmap" component={EchartMap}/>
        </Switch>
    </BrowserRouter>
);


export default BasicRoute;