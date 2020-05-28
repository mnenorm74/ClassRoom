import React, {useEffect} from "react";
import "../cssDirectory/AuthorizationPage.css"
import ReactDOM from "react-dom";
import Page from "./pageProvider";
import {srcUrl} from "../mySettings";
import warnEmptiness from "../validation/warnEmptiness";
import isEmptyField from "../validation/isEmptyField";
import warnEmptinessHidden from "../validation/warnEmptinessHidden";

const formName = "authForm";

function isValidForm(): boolean {
    return !isEmptyField(formName, "Username") && !isEmptyField(formName, "Password");
}

function AuthorizationPage() {
    function sendAuth() {
        if (!isValidForm()) {
            // @ts-ignore
            document.querySelector('#authorizationButton').setAttribute("disabled", "true")
            return false;
        }
        // let form = document.getElementById("authForm");
        let form: any = document.forms.namedItem("authForm");
        let formData = new FormData(form);
        console.log("auth");
        fetch(`${srcUrl}/account/login`, {
            method: 'POST',
            credentials: "include",
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
        <div id="authorizationPage">
            <form name={formName} id={"authorizationWindow"} onChange={() => {
                if (!isValidForm()) {
                    // @ts-ignore
                    document.querySelector('#authorizationButton').setAttribute("disabled", "true")
                } else {
                    // @ts-ignore
                    document.querySelector('#authorizationButton').removeAttribute("disabled")
                }
            }}>
                <span id="authorizationWindowHeader">ВХОД</span>
                {/*<form id="authorizationWindow" name={"authForm"}>*/}
                <span className="authorizationContentStatus" id="loginMessage">Логин не может быть пустым</span>
                <input id="loginInput" name="Username" placeholder="Логин" onChange={() => {
                    warnEmptinessHidden(formName, "Username", "loginMessage")
                }}/>
                <span className="authorizationContentStatus" id="passwordMessage">Пароль не может быть пустым</span>
                <input id="passwordInput" type="password" name="Password" placeholder="Пароль" onChange={() => {
                    warnEmptinessHidden(formName, "Password", "passwordMessage")
                }}/>
                <div className={'authorizationLine'}>
                    <p id={'textRemember'}>Запомнить</p>
                    <input id="rememberMe" name="RememberMe" type="checkbox" className={'check'} value={0}/>
                </div>
                {/*</form>*/}
            {/*<div id="authorizationWindow">
                <span id="authorizationWindowHeader">ВХОД</span>
                <form name={"authForm"}>
                    <input id="loginInput" name="Username" placeholder="Логин"/>
                    <input id="passwordInput" type="password" name="Password" placeholder="Пароль"/>
                    <input id="rememberMe" name="RememberMe" type="checkbox" value={0}/>
            </form>*/}
                <button id="authorizationButton" onClick={sendAuth}>ВОЙТИ</button>
                <span id="registrationLink" onClick={() => {
                    ReactDOM.render(
                        Page.GroupRegistrationPage(),
                        document.getElementById('root')
                    )
                }}>Зарегистрировать группу</span>
            </form>
        </div>
    )
}

export default AuthorizationPage
