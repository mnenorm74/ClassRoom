import React from 'react';
import '../class-room.css';
import MenuItem from "./menuItem";
import {useState} from 'react'
import MainPage from "../pages/mainPage";

function Menu() {
    const [isRotate, rotate] = useState(false);
    let collapseButton = <button className="collapseButton" onClick={event => {
        let element = event.target;
        let menu = document.querySelector('#menu');
        menu.style.left = !isRotate ? '0' : '-15vw'
        element.style.transform = !isRotate ? 'rotate(180deg)' : 'rotate(0deg)';
        rotate(!isRotate);
    }
    }>></button>
    return (
        <div id="menu">
            <div id="itemContainer">
                <MenuItem text={"Главная"} link={MainPage}/>
                <MenuItem text={"Хранилище"}/>
                <MenuItem text={"Новости"}/>
                <MenuItem text={"Расписание"}/>
            </div>
            {collapseButton}
        </div>
    )
}

export default Menu