import React from 'react';
import './profile.css'
import CurrentUser from "../../СurrentUserInfoDB";
import Logo from '../menu/logoContainer'

function Profile() {
    return (
        <>
            <img className='avatar' src={Logo.teaPot} alt=""/>
            <div className="userData">
                <span>{CurrentUser.Name}</span>
                <span>{CurrentUser.Surname}</span>
            </div>
            <div className='optionsContainer'>
                <img className='optionsLogo' src={Logo.settingsLogo} alt=""/>
                <img className='optionsLogo' src={Logo.logOutLogo} alt=""/>
            </div>
        </>
    )
}

export default Profile