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
//import Cookies from 'js-cookie'
import {srcUrl} from "./mySettings";
import {useEffect} from "react";
import {useState} from "react";


function ClassRoom() {
    let myArray: any[] = ['something', 1,];
    const [code, setCode] : [any, any] = useState(404);

    useEffect(() => {
        fetch(`${srcUrl}/Account`,
            {
                credentials: "include",
            })
            .then(res => setCode(res.status));
    },[]);

    function showPage() {
        console.log(code, "CODE");
        if(code === 200) {
            return (<Router>
                <Menu/>
                <div id="pageContainer">
                    <Switch>
                        <Redirect exact from="/" to="/main"/>
                        <Route path="/main">
                            <Page.MainPage/>
                        </Route>
                        <Route path="/storage">
                            <Page.StoragePage/>
                        </Route>
                        <Route path="/news">
                            <Page.NewsPage/>
                        </Route>
                        <Route path="/schedule">
                            <Page.SchedulePage/>
                        </Route>
                        <Route path="/groupList">
                            <Page.GroupListPage/>
                        </Route>
                    </Switch>
                </div>
            </Router>)
        } else {
            return (<Router>
                <Switch>

                    <Route path="/">
                        <Page.AuthorizationPage/>
                    </Route>
                </Switch>
            </Router>)
        }
    }

    return (
        <>
            {showPage()}
        </>
    );
}

export default ClassRoom;