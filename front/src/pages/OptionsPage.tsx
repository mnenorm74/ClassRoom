import React, {useEffect, useLayoutEffect, useState} from "react";
import "../cssDirectory/optionsPage.css"
import warnEmail from "../validation/warnEmail";
import warnEmptiness from "../validation/warnEmptiness";
import warnPassword from "../validation/warnPassword";
import warnEqualPasswords from "../validation/warnEqualPasswords";
import isEmail from "../validation/isEmail";
import isEmptyField from "../validation/isEmptyField";
import {srcUrl} from "../mySettings";

function showForm(id: string) {
    if (document.getElementById(id)!.style.display !== 'block') {
        document.getElementById(id)!.style.display = 'block'
    } else {
        document.getElementById(id)!.style.display = 'none'
    }
}


function OptionsPage() {

    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');

    useEffect(() => {
        //  fetch(`${srcUrl}/account`)
    }, []);

    function onSubmitEmail() {
        // @ts-ignore
        if (!isEmail(document.forms['EmailChange']["newEmail"].value)) {
            document.querySelector('#emailSend')!.setAttribute("disabled", "true");
            let form: any = document.forms.namedItem('EmailChange');
            let formData = new FormData(form);
            fetch(`${srcUrl}/account/changeEmail`, {
                method: "post",
                credentials: "include",
                body: formData
            }).then(res => res.json()).then(res => setEmail(res));
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
        if (document.forms["PasswordChange"]["PasswordRepeat"].value !== document.forms["PasswordChange"]["NewPassword"].value
            // @ts-ignore
            || document.forms["PasswordChange"]["PasswordRepeat"].value.length < 6) {
            document.querySelector('#passwordSend')!.setAttribute("disabled", "true");
            let form: any = document.forms.namedItem('PasswordChange');
            let formData = new FormData(form);
            fetch(`${srcUrl}/account/changePassword`, {
                method: "post",
                credentials: "include",
                body: formData
            }).then(res => res);
            // }
        }
    }

    function onSubmitPhoto() {
        // @ts-ignore
        if (!document.forms["photoChanging"]["Photo"].value) {
            document.querySelector('#photoChangeButton')!.setAttribute("disabled", "true")
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
                        <button className={'optionsButton'} id={'emailSend'} onClick={() => {
                            onSubmitEmail()
                        }}>Применить
                        </button>
                    </div>
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
                        <button className={'optionsButton'} id={'loginSend'} onClick={() => {
                            onSubmitLogin()
                        }}>Применить
                        </button>
                    </div>
                </form>


                    <form name={'photoChanging'} className="optionContainer">
                        <span className="optionHeader">Фото</span>
                        <div id={'photoChangingLine'}>
                            <input name="Photo" type="file" id="newPhoto" onChange={() => {
                                // @ts-ignore
                                if (!document.forms["photoChanging"]["Photo"].value) {
                                    document.querySelector('#photoChangeButton')!.setAttribute("disabled", "true")
                                } else {
                                    // @ts-ignore
                                    document.querySelector('#photoChangeButton').removeAttribute("disabled")
                                }
                            }}/>
                            <button className={'optionsButton'} id={'photoChangeButton'} onClick={onSubmitPhoto}>Сменить
                                фото
                            </button>
                        </div>
                    </form>
            </div>


            <div className="optionContainer" id={'optionsButtons'}>
                <button className={'optionsButton'}>Удалить аккаунт</button>


                <div className="passwordContainer">
                    <button className={'optionsButton'} id={'passwordShow'} onClick={() => {
                        showForm('PasswordForm')
                    }}>Изменить пароль
                    </button>
                    <form name={"PasswordChange"} id={'PasswordForm'} onChange={() => {
                        // @ts-ignore
                        if (document.forms["PasswordChange"]["PasswordRepeat"].value !== document.forms["PasswordChange"]["NewPassword"].value
                            // @ts-ignore
                            || document.forms["PasswordChange"]["PasswordRepeat"].value.length < 6) {
                            document.querySelector('#passwordSend')!.setAttribute("disabled", "true")
                        } else {
                            document.querySelector('#passwordSend')!.removeAttribute("disabled")
                        }
                    }}>
                        <div id="passwordFields">
                            <input name="oldPassword" type="password" placeholder="Старый пароль"
                                   className="optionInput"
                                   id="oldPassword"/>
                            <span className="optionHeader" id='newPasswordMessage'>Пароль не менее 6 символов</span>
                            <input name="NewPassword" type="password" placeholder="Новый пароль" className="optionInput"
                                   id="newPassword"
                                   onChange={() => {
                                       warnPassword('PasswordChange', "NewPassword", "newPasswordMessage");
                                       warnEqualPasswords('PasswordChange', "NewPassword", "PasswordRepeat", 'newEqualPasswordMessage')
                                   }}/>
                            <span className="optionHeader" id='newEqualPasswordMessage'>Пароли должны совпадать</span>
                            <input name="PasswordRepeat" type="password" placeholder="Новый пароль"
                                   className="optionInput"
                                   id="newPasswordRepeated"
                                   onChange={() => {
                                       warnEqualPasswords('PasswordChange', "NewPassword", "PasswordRepeat", 'newEqualPasswordMessage')
                                   }}/>
                        </div>
                        <button className={'optionsButton'} id={'passwordSend'} onClick={() => {
                            onSubmitPassword()
                        }}>Применить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OptionsPage