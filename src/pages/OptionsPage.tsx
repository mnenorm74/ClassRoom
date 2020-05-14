import React from "react";
import "../cssDirectory/optionsPage.css"
import CurrentUser from "../СurrentUserInfoDB";
import groupDB from "../components/group/groupDB"

function OptionsPage(){
    let id = CurrentUser.Id;
    let userData = (groupDB.filter(user => user.Id === id))[0];

    return(
        <div id="optionsContent">
            <div id="optionContainer">
                <span className="optionHeader">E-mail</span>
                <input id="optionInput" placeholder={userData.Email}/>
            </div>
            <div id="optionContainer">
                <span className="optionHeader">Логин</span>
                <input type="text" id="optionInput" placeholder={userData.Username}/>
            </div>
            <div id="passwordContainer">
                <span className="optionHeader">Изменить пароль</span>
                <div id="passwordFields">
                    <input type="password" placeholder="Старый пароль" id="optionInput"/>
                    <input type="password" placeholder="Новый пароль" id="optionInput"/>
                    <input type="password" placeholder="Новый пароль" id="optionInput"/>
                </div>
            </div>
            <div id="optionContainer">
                <span className="optionHeader">Изменить фото</span>
                <button id="photoAdding">
                    <span id="addingHeader">Загрузить</span>
                </button>
            </div>
            <div id="optionContainer">
                <button id="deletingAccountButton">Удалить аккаунт</button>
            </div>
        </div>
    )
}

export default OptionsPage