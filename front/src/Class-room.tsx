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
    Redirect
} from "react-router-dom";

function ClassRoom() {
    return (
        <Router>
            <Menu/>
            <div id="pageContainer">
                <Switch>
                    <Redirect exact from="/" to="/main"/>
                    <Route path="/main">
                        <Page.MainPage/>
                    </Route>
                    <Route path="/storage">
                        <Page.SchedulePage/>
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
        </Router>
    );
}

export default ClassRoom;