import React, {useEffect, useLayoutEffect, useState} from "react";
import "../cssDirectory/optionsPage.css"
import warnEmail from "../validation/warnEmail";
import warnEmptiness from "../validation/warnEmptiness";
import warnPassword from "../validation/warnPassword";
import warnEqualPasswords from "../validation/warnEqualPasswords";
import isEmail from "../validation/isEmail";
import isEmptyField from "../validation/isEmptyField";
import {srcUrl} from "../mySettings";
import {currentUserInfo} from "../components/Profile/profile";
import {addUserTags, getUser} from "../fetches/users";

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
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getUser()
            .then(res => res.json())
            .then(result => {
                // @ts-ignore
                setEmail(result.email);
                setLogin(result.username);
                setIsLoaded(true);
            })
    }, []);

    function onSubmitEmail() {
        // @ts-ignore
        if (!isEmail(document.forms['EmailChange']["newEmail"].value)) {
            document.querySelector('#emailSend')!.setAttribute("disabled", "true");
            return;
        }
        let form: any = document.forms.namedItem('EmailChange');
        let formData = new FormData(form);
        fetch(`${srcUrl}/account/changeEmail`, {
            method: "post",
            credentials: "include",
            body: formData
        }).then(res => res);
    }

    function onSubmitLogin() {
        if (isEmptyField('LoginChange', "NewLogin")) {
            document.querySelector('#loginSend')!.setAttribute("disabled", "true")
            return;
        }
        let form: any = document.forms.namedItem('LoginChange');
        let formData = new FormData(form);
        fetch(`${srcUrl}/account/changeLogin`, {
            method: "post",
            credentials: "include",
            body: formData
        }).then(res => res);
    }

    function onSubmitPassword() {

        //debugger;
        // @ts-ignore
        // if (document.forms["PasswordChange"]["PasswordRepeat"].value !== document.forms["PasswordChange"]["NewPassword"].value
        //     // @ts-ignore
        //     || document.forms["PasswordChange"]["PasswordRepeat"].value.length < 6) {
        document.querySelector('#passwordSend')!.setAttribute("disabled", "true");
        let form: any = document.forms.namedItem('PasswordChange');
        let formData = new FormData(form);
        fetch(`${srcUrl}/account/changePassword`, {
            method: "post",
            credentials: "include",
            body: formData
        }).then(res => res);
        // }
        //   }
    }

    function onSubmitPhoto() {
        // @ts-ignore
        if (!document.forms["photoChanging"]["Photo"].value) {
            document.querySelector('#photoChangeButton')!.setAttribute("disabled", "true")
        }
        let a: any = document.querySelector("#newPhoto");
        //let photo : any = a.files[0];

        let formData = new FormData();
        formData.append("image", a.files[0]);

        /*console.log(photo, typeof photo, "FILE")
        console.log(blob, typeof blob, "BLOB")*/
        // @ts-ignore


        fetch(`${srcUrl}/Users/${currentUserInfo.id}/avatars`, {
            method: "patch",
            credentials: "include",
            body: formData
        }).then(() => window.location.reload());
    }

    function onSubmitDelete() {
        fetch(`${srcUrl}/Users/${currentUserInfo.id}`, {
            method: "delete",
            credentials: "include"
        }).then(() => window.location.reload());
    }


    return (
        <div id="optionsContent">
            <div id="userOptions">
                <p id="optionsHeader">Настройки профиля</p>
                <div className="optionContainer">
                    <span className="optionHeader">E-mail</span>
                    <span className="optionHeader">{(isLoaded) ? email : null}</span>
                    <button className={'optionsButton'} id={'emailChangingButton'} onClick={() => {
                        showForm('emailForm')
                    }}>Изменить
                    </button>
                </div>
                <form name={'EmailChange'} id={'emailForm'} className="optionContainer" onSubmit={onSubmitEmail}
                      onChange={() => {
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
                        <input name="NewEmail" className="optionInput" id="newEmail" onChange={() => {
                            warnEmail('EmailChange', "NewEmail", "userEmailMessage")
                        }}/>
                        <button className={'optionsButton'} id={'emailSend'} type="submit">Применить
                        </button>
                    </div>
                </form>


                <div className="optionContainer">
                    <span className="optionHeader">Логин</span>
                    <span className="optionHeader">{(isLoaded) ? login : null}</span>
                    <button className={'optionsButton'} id={'LoginChangingButton'} onClick={() => {
                        showForm('LoginForm')
                    }}>Изменить
                    </button>
                </div>
                <form name={'LoginChange'} id={'LoginForm'} className="optionContainer" onChange={() => {
                    // @ts-ignore
                    if (isEmptyField('LoginChange', "NewLogin")) {
                        document.querySelector('#loginSend')!.setAttribute("disabled", "true")
                    } else {
                        document.querySelector('#loginSend')!.removeAttribute("disabled")
                    }
                }} onSubmit={onSubmitLogin}>
                    <span className="optionMessage" id='userLoginMessage'>Логин не может быть пустым</span>
                    <div className="optionContainer" id="loginChanging">
                        <span className="optionHeader">Новый логин</span>
                        <input name="NewLogin" type="text" className="optionInput" id="newLogin"
                               onChange={() => {
                                   warnEmptiness('LoginChange', "NewLogin", 'userLoginMessage')
                               }}/>
                        <button className={'optionsButton'} type={"submit"} id={'loginSend'} /*onClick={() => {
                            onSubmitLogin()
                        }}*/>Применить
                        </button>
                    </div>
                </form>


                <form name={'photoChanging'} className="optionContainer" onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitPhoto();
                }}>
                    <span className="optionHeader">Фото</span>
                    <input name="Photo" type="file" id="newPhoto" className={'optionHeader'} onChange={() => {
                        // @ts-ignore
                        if (!document.forms["photoChanging"]["Photo"].value) {
                            document.querySelector('#photoChangeButton')!.setAttribute("disabled", "true")
                        } else {
                            // @ts-ignore
                            document.querySelector('#photoChangeButton').removeAttribute("disabled")
                        }
                    }}/>
                    <button className={'optionsButton'} id={'photoChangeButton'} type={"submit"}>Сменить фото</button>
                </form>
            </div>

            <div className={"optionContainer"} id={"optionsButton"}>
                <div id={"optionsFooter"}>
                    <button className={'optionsButton'} onClick={onSubmitDelete}>Удалить аккаунт</button>


                    <div className="passwordContainer">
                        <button className={'optionsButton'} id={'passwordShow'} onClick={() => {
                            showForm('PasswordForm')
                        }}>Изменить пароль
                        </button>
                        <form name={"PasswordChange"} id={'PasswordForm'} onSubmit={onSubmitPassword} onChange={() => {
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
                                <input name="NewPassword" type="password" placeholder="Новый пароль"
                                       className="optionInput"
                                       id="newPassword"
                                       onChange={() => {
                                           warnPassword('PasswordChange', "NewPassword", "newPasswordMessage");
                                           warnEqualPasswords('PasswordChange', "NewPassword", "PasswordRepeat", 'newEqualPasswordMessage')
                                       }}/>
                                <span className="optionHeader"
                                      id='newEqualPasswordMessage'>Пароли должны совпадать</span>
                                <input name="PasswordRepeat" type="password" placeholder="Новый пароль"
                                       className="optionInput"
                                       id="newPasswordRepeated"
                                       onChange={() => {
                                           warnEqualPasswords('PasswordChange', "NewPassword", "PasswordRepeat", 'newEqualPasswordMessage')
                                       }}/>
                            </div>
                            <button className={'optionsButton'} id={'passwordSend'}>Применить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OptionsPage