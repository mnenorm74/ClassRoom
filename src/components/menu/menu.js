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
        menu.style.left = !isMoveOut ? '-17vw' : '0'
        document.querySelector('#pageContainer').style.marginLeft = !isMoveOut ? '8vw' : '25vw';
        document.querySelector('#pageContainer').style.width = !isMoveOut ? '92vw' : '75vw';
        element.style.transform = !isMoveOut ? 'rotate(-180deg)' : 'rotate(0deg)';
        moveOut(!isMoveOut);
    }}/>
    return (
        <div id="menu">
            <div id="itemContainer">
                <Profile/>
                <MenuItem text={"Главная"} link={Page.MainPage} img='../icons/insert_drive_file-white-18dp.svg'/>
                <MenuItem text={"Хранилище"} link={Page.StoragePage} img='../icons/insert_drive_file-white-18dp.svg'/>
                <MenuItem text={"Новости"} link={Page.NewsPage} img='../icons/insert_drive_file-white-18dp.svg'/>
                <MenuItem text={"Расписание"} link={Page.SchedulePage} img='../icons/insert_drive_file-white-18dp.svg'/>
                <MenuItem text={"Список группы"} link={Page.GroupListPage} img='../icons/insert_drive_file-white-18dp.svg'/>
            </div>
            {collapseButton}
            <div id="menuOptions">
                {menuOption("Настройки", Page.OptionsPage)}
                {menuOption("Выход", Page.AuthorizationPage)}
            </div>
        </div>
    )
}

export default Menu