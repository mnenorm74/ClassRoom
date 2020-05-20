import React from "react";
import "../cssDirectory/UserAuthorizationPage.css"
import ReactDOM from "react-dom";
import Page from "./pageProvider";

function UserAuthorizationPage() {
    return (
        <div id="userAuthorization">
            <div id="userAuthorizationWindow">
                <button id="toGroupAuthorizationForm" onClick={() => {
                    ReactDOM.render(
                        Page.GroupAuthorizationPage(),
                        document.getElementById('root')
                    );
                }}/>
                <span id="userAuthorizationWindowHeader">РЕГИСТРАЦИЯ</span>
                <input className="userAuthorizationField" placeholder="Фамилия"></input>
                <input className="userAuthorizationField" placeholder="Имя"/>
                <input className="userAuthorizationField" placeholder="Отчество"/>
                <input className="userAuthorizationField" placeholder="E-mail"/>
                <input className="userAuthorizationField" placeholder="Логин"/>
                <input className="userAuthorizationField" placeholder="Пароль" type="password"/>
                <input className="userAuthorizationField" placeholder="Пароль" type="password"/>
                <button id="registerUserButton">РЕГИСТРАЦИЯ</button>
            </div>
        </div>
    )
}

export default UserAuthorizationPage
