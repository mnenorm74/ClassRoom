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
import Cookies from 'js-cookie'

let tiZaregalsa = Cookies.get('name');

function ClassRoom() {
    var myArray: any[] = ['something', 1,];


    return (
        <>
            {tiZaregalsa === 'ded' ? <Router>
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
                </Router> :
                <Router>
                    <Switch>

                        <Route path="/">
                            <Page.AuthorizationPage/>
                        </Route>
                    </Switch>
                </Router>}
        </>
    );
}

export default ClassRoom;