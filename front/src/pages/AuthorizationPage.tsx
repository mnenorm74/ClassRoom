import React from "react";
import "../cssDirectory/AuthorizationPage.css"
import ReactDOM from "react-dom";
import Page from "./pageProvider";
import Cookies from 'js-cookie'

function AuthorizationPage() {
    return (
        <div id="authorizationPage">
            <div id="authorizationWindow">
                <span id="authorizationWindowHeader">ВХОД</span>
                <input id="loginInput" placeholder="Логин"></input>
                <input id="passwordInput" type="password" placeholder="Пароль"></input>
                <button id="authorizationButton" onClick={() => {
                    let login = (document.querySelector('#loginInput') as HTMLInputElement).value
                    if (login==='ded'){
                        Cookies.set('name', 'ded');
                        window.location.reload();
                    }
                }}>ВОЙТИ
                </button>
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
