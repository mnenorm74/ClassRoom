import React from "react";
import "../cssDirectory/optionsPage.css"

function OptionsPage(){
    return(
        <div id="optionsContent">
            <div id="optionContainer">
                <span id="optionHeader">E-mail</span>
                <input type="text" id="optionInput"></input>
            </div>
            <div id="optionContainer">
                <span id="optionHeader">Логин</span>
                <input type="text" id="optionInput"></input>
            </div>
            <div id="passwordContainer">
                <span id="optionHeader">Изменить пароль</span>
                <div id="passwordFields">
                    <input type="password" placeholder="Старый пароль" id="optionInput"></input>
                    <input type="password" placeholder="Новый пароль" id="optionInput"></input>
                    <input type="password" placeholder="Новый пароль" id="optionInput"></input>
                </div>
            </div>
            <div id="optionContainer">
                <span id="optionHeader">Изменить фото</span>
                <button id="photoAdding">
                    <span id="addingHeader">Загрузить</span>
                </button>
            </div>
            <div id="optionContainer">
                <span id="optionHeader">Удалить аккаунт</span>
            </div>
        </div>
    )
}

export default OptionsPage