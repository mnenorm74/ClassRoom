import React from 'react';
import '../../cssDirectory/class-room.css';
import './menu.css'
import MenuItem from "./menuItem";
import Page from "../../pages/pageProvider";
import Profile from "../Profile/profile";

function Menu() {
    return (
        <div id="menu">
            <div id="itemContainer">
                <div id="applicationLogo"/>
                <MenuItem text={"Главная"} link={Page.MainPage}/>
                <MenuItem text={"Хранилище"} link={Page.StoragePage}/>
                <MenuItem text={"Новости"} link={Page.NewsPage}/>
                <MenuItem text={"Расписание"} link={Page.SchedulePage}/>
                <MenuItem text={"Список группы"} link={Page.GroupListPage}/>
            </div>
            <div id="menuOptions">
                <Profile/>
                {/*{menuOption("Настройки", Page.OptionsPage)}
                {menuOption("Выход", Page.AuthorizationPage)}*/}
            </div>
        </div>
    )
}

export default Menu