import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ApiTest from './ApiTest';

const BasicRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ApiTest}/>
            <Route exact path="/apiTest/:id" component={ApiTest}/>
        </Switch>
    </BrowserRouter>
);


export default BasicRoute;