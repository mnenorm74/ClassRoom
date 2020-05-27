import React from "react";
import "../cssDirectory/UserAuthorizationPage.css"
import ReactDOM from "react-dom";
import Page from "./pageProvider";
import {srcUrl} from "../mySettings";

function UserAuthorizationPage() {

    function sendRegistration() {
        // let form = document.getElementById("authForm");
        let form: any = document.forms.namedItem("registration");
        let formData = new FormData(form);
        fetch(`${srcUrl}/users`, {
            method: 'POST',
            headers: {
                // 'Accept': 'multipart/form-data',
                // 'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    window.location.reload();
                }

            })
    }



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
                <form name="registration">
                    <input className="userAuthorizationField" placeholder="Фамилия"/>
                    <input className="userAuthorizationField" placeholder="Имя"/>
                    <input className="userAuthorizationField" placeholder="Отчество"/>
                    <input className="userAuthorizationField" placeholder="E-mail"/>
                    <input className="userAuthorizationField" placeholder="Логин"/>
                    <input className="userAuthorizationField" placeholder="Пароль" type="password"/>
                    <input className="userAuthorizationField" placeholder="Пароль" type="password"/>
                </form>
                <button id="registerUserButton" onClick={sendRegistration}>РЕГИСТРАЦИЯ</button>
            </div>
        </div>
    )
}

export default UserAuthorizationPage
