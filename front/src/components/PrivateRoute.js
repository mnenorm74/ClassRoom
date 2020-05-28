import * as React from 'react';
import Menu from './menu/menu'
// import Page from "./pages/pageProvider";
import '../cssDirectory/class-room.css';
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
// import {srcUrl} from "./mySettings";
import {useEffect} from "react";
import {useState} from "react";
import {srcUrl} from "../mySettings";
import Page from "../pages/pageProvider";


function PrivateRoute({component, path}) {
    const [code, setCode] = useState(100);

    useEffect(() => {
        setTimeout(() => {
            fetch(`${srcUrl}/Account`,
                {
                    credentials: "include",
                })
                .then(res => setCode(res.status));
        }, 1000);

    }, []);
    return (
        <>
            {code === 100
                ? <div style={{margin: "20% auto", textAlign: 'center', width: '100vw'}}>
                    <ReactLoading type={"spinningBubbles"} color='#BA68C8' width={'10%'} className={'loading'}/>
                </div>

                : code === 200
                    ? <>
                        <Menu/>
                        <div id="pageContainer">
                            <Route component={component} path={path}/>
                        </div>
                    </>
                    : <Route path="/" component={Page.AuthorizationPage}/>}
        </>
    );
}

export default PrivateRoute