import React from "react";
import "../cssDirectory/optionsPage.css"

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

function OptionsPage() {

    return (
        <div id="optionsContent">
            <form>
                <p id="optionsHeader">Настройки профиля</p>
                <div className="optionContainer">
                    <span className="optionHeader">E-mail</span>
                    <span className="optionHeader">Текущий e-mail</span>
                </div>
                <div className="optionContainer" id="emailChanging">
                    <span className="optionHeader">Новый e-mail</span>
                    <input className="optionInput" id="newEmail" disabled={true}/>
                </div>
                <div className="optionContainer">
                    <span className="optionHeader">Логин</span>
                    <span className="optionHeader">Текущий логин</span>
                </div>
                <div className="optionContainer" id="loginChanging">
                    <span className="optionHeader">Новый логин</span>
                    <input type="text" className="optionInput" id="newLogin" disabled={true}/>
                </div>
                <div id="passwordContainer">
                    <span className="optionHeader">Изменить пароль</span>
                    <div id="passwordFields">
                        <input type="password" placeholder="Старый пароль" className="optionInput" id="oldPassword"
                               disabled={true}/>
                        <input type="password" placeholder="Новый пароль" className="optionInput" id="newPassword"
                               disabled={true}/>
                        <input type="password" placeholder="Новый пароль" className="optionInput"
                               id="newPasswordRepeated"
                               disabled={true}/>
                    </div>
                </div>
                <div className="optionContainer">
                    <span className="optionHeader">Фото</span>
                    <input type="file" id="newPhoto" disabled={true}/>
                </div>
                <button id="savingButton" disabled={true}>Применить</button>
            </form>

            <div className="optionContainer">
                <button id="deletingAccountButton">Удалить аккаунт</button>
                <button id="changingAccountButton" onClick={() => unblockFields()}>Изменить аккаунт</button>
            </div>

        </div>
    )
}

export default OptionsPage