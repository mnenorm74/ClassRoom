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
//import Cookies from 'js-cookie'
import {srcUrl} from "./mySettings";
import {useEffect} from "react";
import {useState} from "react";


function PrivateRoute({children, ...rest}) {
    return (
        <Route {...rest} render={({location}) =>
            fakeAuth.isAuthenticated ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: location}
                    }}
                />
            )
        }
        />
    );
}