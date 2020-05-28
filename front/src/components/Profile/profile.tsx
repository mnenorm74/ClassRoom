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
import {addUserTags, getUser} from "../../fetches/users";
import {addNewsTag, getNews} from "../../fetches/news";
export let currentUserInfo : any;

function Profile() {
    const [user, setUser]: [any, any] = useState([]);
    const [isLoadedUser, setIsLoadedUser] = useState(false);

    useEffect(() => {
        getUser()
            .then(res => res.json())
            .then(result => {
                currentUserInfo = result;
                setUser(addUserTags(result));
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
            <div className='optionsContainer'>
                <NavLink to={'/profile'} >
                <img className='optionsLogo' src={Logo.settingsLogo} alt="" onClick={() => {}}/>
                </NavLink>
                <img className='optionsLogo' src={Logo.logOutLogo} alt="" onClick={() => {logOut()}}/>
            </div>
        </>
    )
}

export default Profile