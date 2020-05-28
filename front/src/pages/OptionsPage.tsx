import React from "react";
import "../cssDirectory/optionsPage.css"
import warnEmail from "../validation/warnEmail";
import warnEmptiness from "../validation/warnEmptiness";
import warnPassword from "../validation/warnPassword";
import warnEqualPasswords from "../validation/warnEqualPasswords";
import isEmail from "../validation/isEmail";
import isEmptyField from "../validation/isEmptyField";

function showForm(id: string) {
    document.getElementById(id)!.style.display = 'block';
}


function OptionsPage() {
    function onSubmitEmail() {
        // @ts-ignore
        if (!isEmail(document.forms['EmailChange']["newEmail"].value)) {
            document.querySelector('#emailSend')!.setAttribute("disabled", "true")
            return;
        }
    }

    function onSubmitLogin() {
        if (isEmptyField('LoginChange', "Login")) {
            document.querySelector('#loginSend')!.setAttribute("disabled", "true")
            return;
        }
    }

    function onSubmitPassword() {
        // @ts-ignore
        if (document.forms["PasswordChange"]["PasswordRepeat"].value !== document.forms["PasswordChange"]["Password"].value
            // @ts-ignore
            && document.forms["PasswordChange"]["PasswordRepeat"].value.length < 6) {
            document.querySelector('#passwordSend')!.setAttribute("disabled", "true")
            return;
        }
    }

    return (
        <div id="optionsContent">
            <div id="userOptions">
                <p id="optionsHeader">Настройки профиля</p>
                <div className="optionContainer">
                    <span className="optionHeader">E-mail</span>
                    <span className="optionHeader">Текущий e-mail</span>
                    <button className={'optionsButton'} id={'emailChangingButton'} onClick={() => {
                        showForm('emailForm')
                    }}>Изменить
                    </button>
                </div>
                <form name={'EmailChange'} id={'emailForm'} onChange={() => {
                    // @ts-ignore
                    if (!isEmail(document.forms['EmailChange']["newEmail"].value)) {
                        document.querySelector('#emailSend')!.setAttribute("disabled", "true")
                    } else {
                        document.querySelector('#emailSend')!.removeAttribute("disabled")
                    }
                }}>
                    <span className="optionMessage" id='userEmailMessage'>E-mail в формате example@mail.ru</span>
                    <div className="optionContainer" id="emailChanging">
                        <span className="optionHeader">Новый e-mail</span>
                        <input name="Email" className="optionInput" id="newEmail" onChange={() => {
                            warnEmail('EmailChange', "Email", "userEmailMessage")
                        }}/>
                    </div>
                    <button className={'optionsButton'} id={'emailSend'} onClick={() => {
                        onSubmitEmail()
                    }}>Применить
                    </button>
                </form>


                <div className="optionContainer">
                    <span className="optionHeader">Логин</span>
                    <span className="optionHeader">Текущий логин</span>
                    <button className={'optionsButton'} id={'LoginChangingButton'} onClick={() => {
                        showForm('LoginForm')
                    }}>Изменить
                    </button>
                </div>
                <form name={'LoginChange'} id={'LoginForm'} onChange={() => {
                    // @ts-ignore
                    if (isEmptyField('LoginChange', "Login")) {
                        document.querySelector('#loginSend')!.setAttribute("disabled", "true")
                    } else {
                        document.querySelector('#loginSend')!.removeAttribute("disabled")
                    }
                }}>
                    <span className="optionMessage" id='userLoginMessage'>Логин не может быть пустым</span>
                    <div className="optionContainer" id="loginChanging">
                        <span className="optionHeader">Новый логин</span>
                        <input name="Login" type="text" className="optionInput" id="newLogin"
                               onChange={() => {
                                   warnEmptiness('LoginChange', "Login", 'userLoginMessage')
                               }}/>
                    </div>
                    <button className={'optionsButton'} id={'loginSend'} onClick={() => {
                        onSubmitLogin()
                    }}>Применить
                    </button>
                </form>


                <div className="passwordContainer">
                    <button className={'optionsButton'} id={'passwordShow'} onClick={() => {
                        showForm('PasswordForm')
                    }}>Изменить пароль
                    </button>
                    <form name={"PasswordChange"} id={'PasswordForm'} onChange={() => {
                        // @ts-ignore
                        if (document.forms["PasswordChange"]["PasswordRepeat"].value !== document.forms["PasswordChange"]["Password"].value
                            // @ts-ignore
                            && document.forms["PasswordChange"]["PasswordRepeat"].value.length < 6) {
                            document.querySelector('#passwordSend')!.setAttribute("disabled", "true")
                        } else {
                            document.querySelector('#passwordSend')!.removeAttribute("disabled")
                        }
                    }}>
                        <div id="passwordFields">
                            <input type="password" placeholder="Старый пароль" className="optionInput"
                                   id="oldPassword"/>
                            <span className="optionHeader" id='newPasswordMessage'>Пароль не менее 6 символов</span>
                            <input name="Password" type="password" placeholder="Новый пароль" className="optionInput"
                                   id="newPassword"
                                   onChange={() => {
                                       warnPassword('PasswordChange', "Password", "newPasswordMessage");
                                       warnEqualPasswords('PasswordChange', "Password", "PasswordRepeat", 'newEqualPasswordMessage')
                                   }}/>
                            <span className="optionHeader" id='newEqualPasswordMessage'>Пароли должны совпадать</span>
                            <input name="PasswordRepeat" type="password" placeholder="Новый пароль"
                                   className="optionInput"
                                   id="newPasswordRepeated"
                                   onChange={() => {
                                       warnEqualPasswords('PasswordChange', "Password", "PasswordRepeat", 'newEqualPasswordMessage')
                                   }}/>
                        </div>
                        <button className={'optionsButton'} id={'passwordSend'} onClick={() => {
                            onSubmitPassword()
                        }}>Применить
                        </button>
                    </form>
                </div>


                <div className="optionContainer">
                    <form name={'photoChanging'}>
                        <span className="optionHeader">Фото</span>
                        <input type="file" id="newPhoto"/>
                        <button className={'optionsButton'}>Сменить фото</button>
                    </form>
                </div>
            </div>

            <div className="optionContainer">
                <button className={'optionsButton'}>Удалить аккаунт</button>
            </div>
        </div>
    )
}

export default OptionsPage