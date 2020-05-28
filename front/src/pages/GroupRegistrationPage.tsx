import React from "react";
import "../cssDirectory/GroupAuthorizationPage.css"
import ReactDOM from "react-dom";
import Page from "./pageProvider";
import isEmptyField from "../validation/isEmptyField";
import warnEmptinessHidden from "../validation/warnEmptinessHidden";
import {srcUrl} from "../mySettings";
import {currentUserInfo} from "../components/Profile/profile";

const formName = "groupAuthorizationForm";

function isValidForm(): boolean {
    return !isEmptyField(formName, "University") && !isEmptyField(formName, "Faculty")
        && !isEmptyField(formName, "GroupName");
}

function GroupRegistrationPage() {
    function sendAuth() {
        if (!isValidForm()) {
            // @ts-ignore
            document.querySelector('.registrationButton').setAttribute("disabled", "true")
            return false;
        }

        let form: any = document.forms.namedItem(formName);
        let formData = new FormData(form);
        debugger;
        fetch(`${srcUrl}/Groups`, {
            method: "post",
            credentials: "include",
            body: formData
        }).then(res => res.json())
            .then((result)=> {
            /*ReactDOM.render(
            Page.UserRegistrationPage(),
            document.getElementById('root')*/
                window.location.href = window.location.origin + "/UserRegistration/" + result.groupId;
        });
    }

    return (
        <div id="groupAuthorization">
            <form name={formName} id="groupAuthorizationForm" onChange={() => {
                if (!isValidForm()) {
                    // @ts-ignore
                    document.querySelector('.registrationButton').setAttribute("disabled", "true")
                } else {
                    // @ts-ignore
                    document.querySelector('.registrationButton').removeAttribute("disabled")
                }
            }} onSubmit={(e) => {
                e.preventDefault();
                sendAuth();
            }}>
                <button id="toAuthorizationForm" onClick={() => {
                    ReactDOM.render(
                        Page.AuthorizationPage(),
                        document.getElementById('root')
                    );
                }}/>
                <span id="groupAuthorizationHeader">РЕГИСТРАЦИЯ ГРУППЫ</span>
                <span className="authorizationContentStatus" id="universityMessage">Поле не может быть пустым</span>
                <input name="University" className="groupAuthorizationInput" placeholder="Университет" onChange={() => {
                    warnEmptinessHidden(formName, "University", "universityMessage")
                }}/>
                <span className="authorizationContentStatus" id="facultyMessage">Поле не может быть пустым</span>
                <input name="Faculty" className="groupAuthorizationInput" placeholder="Институт" onChange={() => {
                    warnEmptinessHidden(formName, "Faculty", "facultyMessage")
                }}/>
                <span className="authorizationContentStatus" id="groupMessage">Поле не может быть пустым</span>
                <input name="GroupName" className="groupAuthorizationInput" placeholder="Имя группы" onChange={() => {
                    warnEmptinessHidden(formName, "GroupName", "groupMessage")
                }}/>
                <button id="toUserRegistration" className={'registrationButton'} type={"submit"}>ПРОДОЛЖИТЬ
                </button>
            </form>
        </div>
    )
}

export default GroupRegistrationPage
