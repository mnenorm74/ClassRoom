import React from "react";
import "../cssDirectory/AuthorizationPage.css"
import ReactDOM from "react-dom";
import Page from "./pageProvider";


function AuthorizationPage(){
    return(
        <div id="authorizationPage">
            <div id="authorizationWindow">
                <span id="authorizationWindowHeader">ВХОД</span>
                <input id="loginInput" placeholder="Логин"></input>
                <input id="passwordInput" type="password" placeholder="Пароль"></input>
                <button id="authorizationButton">ВОЙТИ</button>
                <span id="registrationLink" onClick={() => {
                    ReactDOM.render(
                        Page.GroupAuthorizationPage(),
                        document.getElementById('root')
                    )
                }}>Зарегистрировать группу</span>
            </div>
        </div>
    )
}

export default AuthorizationPage
