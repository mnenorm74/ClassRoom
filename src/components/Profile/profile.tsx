import React, {ReactElement} from 'react';
import './profile.css'
import CurrentUser from "../../СurrentUserInfoDB";
import Logo from '../menu/logoContainer'
import ReactDOM from "react-dom";
import Page from "../../pages/pageProvider";

function Profile() {
    return (
        <>
            <img className='avatar' src={Logo.teaPot} alt=""/>
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
                <img className='optionsLogo' src={Logo.logOutLogo} alt="" onClick={() => {
                    ReactDOM.render(
                        Page.AuthorizationPage(),
                        document.getElementById('pageContainer')
                    );
                }}/>
            </div>
        </>
    )
}

export default Profile