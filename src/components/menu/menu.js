import React from 'react';
import '../../cssDirectory/class-room.css';
import './menu.css'
import MenuItem from "./menuItem";
import menuOption from "./menuOption";
import {useState} from 'react'
import Page from "../../pages/pageProvider";
import Profile from "../Profile/profile";

function Menu() {
    const [isMoveOut, moveOut] = useState(false);
    let collapseButton = <button className="collapseButton" onClick={event => {
        let element = event.target;
        let menu = document.querySelector('#menuContainer');
        menu.style.left = !isMoveOut ? '-12vw' : '0'
        document.querySelector('#pageContainer').style.marginLeft = !isMoveOut ? '8vw' : '18vw';
        document.querySelector('#pageContainer').style.width = !isMoveOut ? '92vw' : '82vw';
        element.style.transform = !isMoveOut ? 'rotate(-180deg)' : 'rotate(0deg)';
        moveOut(!isMoveOut);
    }}/>
    return (
        <div id="menu">
            <div id="itemContainer">
                <div id="applicationLogo"></div>
                <MenuItem text={"Главная"} link={Page.MainPage}/>
                <MenuItem text={"Хранилище"} link={Page.StoragePage}/>
                <MenuItem text={"Новости"} link={Page.NewsPage}/>
                <MenuItem text={"Расписание"} link={Page.SchedulePage}/>
                <MenuItem text={"Список группы"} link={Page.GroupListPage}/>
            </div>
            {collapseButton}
            <div id="menuOptions">
                <Profile/>
                {menuOption("Настройки", Page.OptionsPage)}
                {menuOption("Выход", Page.AuthorizationPage)}
            </div>
        </div>
    )
}

export default Menu