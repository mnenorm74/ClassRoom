import React from 'react';
import '../../cssDirectory/class-room.css';
import './menu.css'
import Profile from "../Profile/profile";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";

function Menu() {
    return (
        <div id="menu">
            <div id="itemContainer">
                <div id="applicationLogo"/>
                <NavLink to="/main" className={'navButton'} activeClassName={'active'}>Главная</NavLink>
                <NavLink to="/storage" className={'navButton'}>Хранилище</NavLink>
                <NavLink to="/news" className={'navButton'}>Новости</NavLink>
                <NavLink to="/schedule" className={'navButton'}>Расписание</NavLink>
                <NavLink to="/groupList" className={'navButton'}>Список группы</NavLink>
            </div>
            <div id="menuOptions">
                <Profile/>
            </div>
        </div>
    )
}

export default Menu