import React from "react";
import "../cssDirectory/GroupAuthorizationPage.css"
import ReactDOM from "react-dom";
import Page from "./pageProvider";
import isEmptyField from "../validation/isEmptyField";
import warnEmptinessHidden from "../validation/warnEmptinessHidden";

const formName = "groupAuthorizationForm";

function isValidForm(): boolean {
    return !isEmptyField(formName, "University") && !isEmptyField(formName, "Faculty")
        && !isEmptyField(formName, "Group");
}

function GroupRegistrationPage() {
    function sendAuth() {
        if (!isValidForm()) {
            // @ts-ignore
            document.querySelector('.registrationButton').setAttribute("disabled", "true")
            return false;
        }


        ReactDOM.render(
            Page.UserRegistrationPage(),
            document.getElementById('root')
        );
    }

    return (
        <div id="groupAuthorization">
            <form id="groupAuthorizationForm" onChange={() => {
                if (!isValidForm()) {
                    // @ts-ignore
                    document.querySelector('.registrationButton').setAttribute("disabled", "true")
                } else {
                    // @ts-ignore
                    document.querySelector('.registrationButton').removeAttribute("disabled")
                }
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
                <input name="Group" className="groupAuthorizationInput" placeholder="Группа" onChange={() => {
                    warnEmptinessHidden(formName, "Group", "groupMessage")
                }}/>
                <button id="toUserRegistration" className={'registrationButton'} onClick={() => {
                    sendAuth();
                }}>ПРОДОЛЖИТЬ
                </button>
            </form>
        </div>
    )
}

export default GroupRegistrationPage
