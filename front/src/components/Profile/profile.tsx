import React, {ReactElement, useEffect, useState} from 'react';
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
import {getUser} from "../../fetches/users";
import {addNewsTag, getNews} from "../../fetches/news";
function Profile() {
    const [user, setUser]: [any, any] = useState([]);
    const [isLoadedUser, setIsLoadedUser] = useState(false);

    useEffect(() => {
        getUser()
            .then(res => res.json())
            .then(result => {
                setUser(<img className='avatar' src={"data:image/png;base64," + result.avatar} alt=""/>);
                setIsLoadedUser(true);
            })
    },[]);

    function logOut() {
        fetch(`${srcUrl}/account/logout`, {
            credentials: "include",
            method: 'post'
        }).then(res => {
            if(res.status === 200){
                window.location.reload();
            }
        });
    }

    function showUserInfo() {
        if(isLoadedUser) {
            console.log(user, "USER");
            return user;
        } else {
            return null;
        }
    }
    
    return (
        <>
            {/*<img className='avatar' src={"data:image/png," + user.avatar} alt=""/>*/}
            {showUserInfo()}
            <div className="userData">
                <span>{CurrentUser.Name}</span>
                <span>{CurrentUser.Surname}</span>
            </div>
            <div className='optionsContainer'>
                <img className='optionsLogo' src={Logo.settingsLogo} alt="" onClick={() => {
                    ReactDOM.render(
                        Page.OptionsPage(),
                        document.getElementById('pageContainer')
                    );
                }}/>
                <img className='optionsLogo' src={Logo.logOutLogo} alt="" onClick={() => {logOut()}}/>
            </div>
        </>
    )
}

export default Profile