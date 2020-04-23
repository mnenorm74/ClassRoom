import React from 'react';
import '../class-room.css';
import MenuItem from "./menuItem";
import {useState} from 'react'
import Page from "../pageProvider";
import Profile from "../components/profile";

function Menu() {
    const [isRotate, rotate] = useState(false);
    let collapseButton = <button className="collapseButton" onClick={event => {
        let element = event.target;
        let menu = document.querySelector('#menu');
        menu.style.left = !isRotate ? '0' : '-15vw'
        element.style.transform = !isRotate ? 'rotate(180deg)' : 'rotate(0deg)';
        rotate(!isRotate);
    }

    }></button>
    return (
        <div id="menu">
            <div id="itemContainer">
                <Profile/>
                <MenuItem text={"Главная"} link={Page.MainPage}/>
                <MenuItem text={"Новости"} link={Page.NewsPage}/>
                <MenuItem text={"Расписание"} link={Page.SchedulePage}/>
                <MenuItem text={"Хранилище"} link={Page.StoragePage}/>
            </div>
            {collapseButton}
        </div>
    )
}

export default Menu