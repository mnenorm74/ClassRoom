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


function ClassRoom() {
    const [code, setCode]: [any, any] = useState(100);

    useEffect(() => {
        setTimeout(() => {
            fetch(`${srcUrl}/Account`,
                {
                    credentials: "include",
                })
                .then(res => setCode(res.status));
        }, 1000);

    }, []);

    function showPage() {
        console.log(code, "CODE");
        if (code === 200) {
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
        }
        if (code === 100) {
            return <div style={{margin: "20% auto",textAlign: 'center', width: '100vw'}}>
                <ReactLoading type={"spinningBubbles"} color='#BA68C8' width={'10%'} className={'loading'} />
            </div>
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
            {/*{tiZaregalsa === 'ded' ? <Router>
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
                </Router>}*/}
        </>
    );
}

export default ClassRoom;