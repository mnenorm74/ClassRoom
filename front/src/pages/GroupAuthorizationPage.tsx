import React from "react";
import "../cssDirectory/GroupAuthorizationPage.css"
import ReactDOM from "react-dom";
import Page from "./pageProvider";

function GroupAuthorizationPage() {
    return (
        <div id="groupAuthorization">
            <div id="groupAuthorizationForm">
                <button id="toAuthorizationForm" onClick={() => {
                    ReactDOM.render(
                        Page.AuthorizationPage(),
                        document.getElementById('root')
                    );
                }}/>
                <span id="groupAuthorizationHeader">РЕГИСТРАЦИЯ ГРУППЫ</span>
                <input className="groupAuthorizationInput" placeholder="Университет"/>
                <input className="groupAuthorizationInput" placeholder="Институт"/>
                <input className="groupAuthorizationInput" placeholder="Группа"/>
                <button id="toUserRegistration" onClick={() => {
                    ReactDOM.render(
                        Page.UserAuthorizationPage(),
                        document.getElementById('root')
                    );
                }}>ПРОДОЛЖИТЬ</button>
            </div>
        </div>
    )
}

export default GroupAuthorizationPage
