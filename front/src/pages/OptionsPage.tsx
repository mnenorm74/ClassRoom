import React from "react";
import "../cssDirectory/optionsPage.css"
import warnEmail from "../validation/warnEmail";
import warnEmptiness from "../validation/warnEmptiness";
import warnPassword from "../validation/warnPassword";
import warnEqualPasswords from "../validation/warnEqualPasswords";
import isEmail from "../validation/isEmail";
import isEmptyField from "../validation/isEmptyField";
import isValidPassword from "../validation/isValidPassword";

function unblockField(selector: string) {
    //@ts-ignore
    document.querySelector(selector).removeAttribute("disabled")
}

function unblockFields() {
    unblockField("#newEmail");
    unblockField("#newLogin");
    unblockField("#oldPassword");
    unblockField("#newPassword");
    unblockField("#newPasswordRepeated");
    unblockField("#newPhoto");
    unblockField("#savingButton");
    document.getElementById('savingButton')!.style.visibility = 'visible';
}

function isValidForm(): boolean {
    // @ts-ignore
    return isEmail(document.forms[formName]["Email"].value) && !isEmptyField(formName, "Login")
        // @ts-ignore
    && isValidPassword(document.forms[formName]["Password"].value) && document.forms[formName]["PasswordRepeat"].value === document.forms[formName]["Password"].value;
}

const formName = "userOptions";

function OptionsPage() {
    function onSubmit() {
        if (!isValidForm()) {
            // @ts-ignore
            document.querySelector('#savingButton').setAttribute("disabled", "true")
            return false;
        }
    }

    return (
        <div id="optionsContent">
            <form name={formName} id="userOptions" onChange={() => {
                if (!isValidForm()) {
                    // @ts-ignore
                    document.querySelector('#savingButton').setAttribute("disabled", "true")
                } else {
                    // @ts-ignore
                    document.querySelector('#savingButton').removeAttribute("disabled")
                }
            }}>
                <p id="optionsHeader">Настройки профиля</p>
                <div className="optionContainer">
                    <span className="optionHeader">E-mail</span>
                    <span className="optionHeader">Текущий e-mail</span>
                </div>
                <span className="optionHeader" id='userEmailMessage'>E-mail в формате example@mail.ru</span>
                <div className="optionContainer" id="emailChanging">
                    <span className="optionHeader">Новый e-mail</span>
                    <input name="Email" className="optionInput" id="newEmail" disabled={true} onChange={()=>{
                        warnEmail(formName, "Email", "userEmailMessage")
                    }}/>
                </div>
                <div className="optionContainer">
                    <span className="optionHeader">Логин</span>
                    <span className="optionHeader">Текущий логин</span>
                </div>
                <span className="optionHeader" id='userLoginMessage'>Логин не может быть пустым</span>
                <div className="optionContainer" id="loginChanging">
                    <span className="optionHeader">Новый логин</span>
                    <input name="Login" type="text" className="optionInput" id="newLogin" disabled={true} onChange={()=>{
                        warnEmptiness(formName, "Login", 'userLoginMessage')
                    }}/>
                </div>
                <div className="passwordContainer">
                    <span className="optionHeader">Изменить пароль</span>
                    <div id="passwordFields">
                        <input type="password" placeholder="Старый пароль" className="optionInput" id="oldPassword"
                               disabled={true}/>
                        <span className="optionHeader" id='newPasswordMessage'>Пароль не менее 6 символов</span>
                        <input name="Password" type="password" placeholder="Новый пароль" className="optionInput" id="newPassword"
                               disabled={true} onChange={()=>{
                                   warnPassword(formName, "Password", "newPasswordMessage");
                                   warnEqualPasswords(formName, "Password", "PasswordRepeat", 'newEqualPasswordMessage')
                        }}/>
                        <span className="optionHeader" id='newEqualPasswordMessage'>Пароли должны совпадать</span>
                        <input name="PasswordRepeat" type="password" placeholder="Новый пароль" className="optionInput"
                               id="newPasswordRepeated"
                               disabled={true} onChange={()=>{
                            warnEqualPasswords(formName, "Password", "PasswordRepeat", 'newEqualPasswordMessage')
                        }}/>
                    </div>
                </div>
                <div className="optionContainer">
                    <span className="optionHeader">Фото</span>
                    <input type="file" id="newPhoto" disabled={true}/>
                </div>
                <button id="savingButton" onClick={onSubmit}>Применить</button>
            </form>

            <div className="optionContainer">
                <button id="deletingAccountButton">Удалить аккаунт</button>
                <button id="changingAccountButton" onClick={() => unblockFields()}>Изменить аккаунт</button>
            </div>

        </div>
    )
}

export default OptionsPage