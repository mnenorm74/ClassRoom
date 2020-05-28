import React, {ReactElement} from 'react';
import './profile.css'
import CurrentUser from "../../СurrentUserInfoDB";
import Logo from '../menu/logoContainer'
import ReactDOM from "react-dom";
import Page from "../../pages/pageProvider";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";
import {srcUrl} from "../../mySettings";

function Profile() {
    function logOut() {
        fetch(`${srcUrl}/account/logout`, {
            credentials: "include",
            method: 'post'
        }).then(res => {
            if (res.status === 200) {
                window.location.reload();
            }
        });
    }

    return (
        <>
            <div className={'userInfo'}>

                <img className='avatar' src={Logo.teaPot} alt=""/>
                <div className='optionsContainer'>
                    <img className='optionsLogo' src={Logo.settingsLogo} alt="" onClick={() => {
                        ReactDOM.render(
                            Page.OptionsPage(),
                            document.getElementById('pageContainer')
                        );
                    }}/>
                    <img className='optionsLogo' src={Logo.logOutLogo} alt="" onClick={() => {
                        logOut()
                    }}/>
                </div>
            </div>
            <div className="userData">
                <span>{CurrentUser.Name}</span>
                <span>{CurrentUser.Surname}</span>
            </div>

        </>
    )
}

export default Profile