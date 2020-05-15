import React from "react";
import "../cssDirectory/AuthorizationPage.css"

function AuthorizationPage(){
    return(
        <div id="authorizationPage">
            <div id="authorizationWindow">
                <span id="authorizationWindowHeader">ВХОД</span>
                <input id="loginInput" placeholder="Логин"></input>
                <input id="passwordInput" type="password" placeholder="Пароль"></input>
                <button id="authorizationButton">ВОЙТИ</button>
                <span id="registrationLink">Зарегистрировать группу</span>
            </div>
        </div>
    )
}

export default AuthorizationPage
