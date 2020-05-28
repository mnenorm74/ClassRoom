import * as React from 'react';
import Menu from './components/menu/menu'
import Page from "./pages/pageProvider";
import './cssDirectory/class-room.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    Redirect,
    useRouteMatch
} from "react-router-dom";
import ReactLoading from 'react-loading';
import PrivateRoute from "./components/PrivateRoute";
//import Cookies from 'js-cookie'
import {srcUrl} from "./mySettings";
import {useEffect} from "react";
import {useState} from "react";


function ClassRoom() {
    return (
        <Router>
            <Switch>
                <Redirect exact from="/" to="/main"/>
                <PrivateRoute path="/main" component={Page.MainPage}/>
                <PrivateRoute path="/storage" component={Page.StoragePage}/>
                <PrivateRoute path="/news" component={Page.NewsPage}/>
                <PrivateRoute path="/schedule" component={Page.SchedulePage}/>
                <PrivateRoute path="/groupList" component={Page.GroupListPage}/>
                <Route path="/userRegistration/:id" component={Page.UserRegistrationPage}/>
            </Switch>
        </Router>
    );
}

export default ClassRoom;