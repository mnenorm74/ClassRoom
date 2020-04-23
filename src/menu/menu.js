import React from 'react';
import '../cssDirectory/class-room.css';
import MenuItem from "./menuItem";
import {useState} from 'react'
import Page from "../pageProvider";
import Profile from "../components/Profile/profile";

function Menu() {
    const [isRotate, rotate] = useState(false);
    let collapseButton = <button className="collapseButton" onClick={event => {
        let element = event.target;
        let menu = document.querySelector('#menu');
        menu.style.left = !isRotate ? '0' : '-17vw'
        element.style.transform = !isRotate ? 'rotate(180deg)' : 'rotate(0deg)';
        rotate(!isRotate);
    }}/>
    return (
        <div id="menu">
            <div id="itemContainer">
                <Profile/>
                <MenuItem text={"Главная"} link={Page.MainPage} img='../icons/insert_drive_file-white-18dp.svg'/>
                <MenuItem text={"Новости"} link={Page.NewsPage} img='../icons/insert_drive_file-white-18dp.svg'/>
                <MenuItem text={"Расписание"} link={Page.SchedulePage} img='../icons/insert_drive_file-white-18dp.svg'/>
                <MenuItem text={"Хранилище"} link={Page.StoragePage} img='../icons/insert_drive_file-white-18dp.svg'/>
            </div>
            {collapseButton}
        </div>
    )
}

export default Menu