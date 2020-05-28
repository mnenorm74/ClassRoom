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
let avatar : any;

function Profile() {
    const [user, setUser]: [any, any] = useState([]);
    const [isLoadedUser, setIsLoadedUser] = useState(false);

    useEffect(() => {
        getUser()
            .then(res => res.json())
            .then(result => {
                currentUserInfo = result;
                avatar = "data:image/png;base64," + result.avatar;
                setUser(addUserTags(result));
                setIsLoadedUser(true);
            })
    },[]);


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

    function showUserInfo() {
        if(isLoadedUser) {
            return user;
        } else {
            return null;
        }
    }

    function showUserAvatar() {
        if(isLoadedUser) {
            return <img className='avatar' src={avatar} alt="avatar"/>;
        } else {
            return null;
        }
    }
    
    // return (
    //     <>
    //         {/*<img className='avatar' src={"data:image/png," + user.avatar} alt=""/>*/}
    //         {showUserInfo()}
    //         <div className='optionsContainer'>
    //             <NavLink to={'/profile'} >
    //             <img className='optionsLogo' src={Logo.settingsLogo} alt="" onClick={() => {}}/>
    //             </NavLink>
    //             <img className='optionsLogo' src={Logo.logOutLogo} alt="" onClick={() => {logOut()}}/>
    //         </div>
    //         </>
    return (
        <>
            <div className={'userInfo'}>

                {showUserAvatar()}
                <div className='optionsContainer'>
                    {/*<img className='optionsLogo' src={Logo.settingsLogo} alt="" onClick={() => {
                        ReactDOM.render(
                            Page.OptionsPage(),
                            document.getElementById('pageContainer')
                        );
                    }}/>*/}
                    <Link to={'/profile'} >
                        <img className='optionsLogo' src={Logo.settingsLogo} alt="" onClick={() => {}}/>
                    </Link>

                    <img className='optionsLogo' src={Logo.logOutLogo} alt="" onClick={() => {
                        logOut()
                    }}/>
                </div>
            </div>
            {/*<div className="userData">
                <span>{CurrentUser.Name}</span>
                <span>{CurrentUser.Surname}</span>
            </div>*/}
            {showUserInfo()}

        </>
    )
}

export default Profile