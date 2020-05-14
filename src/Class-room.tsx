import * as React from 'react';
import Menu from './components/menu/menu'
import Page from "./pages/pageProvider";
import './cssDirectory/class-room.css';

function ClassRoom() {
    return (
        <>
            <div id="menuContainer">
                <Menu/>
            </div>
            <div id="pageContainer">
                <Page.MainPage/>
            </div>
        </>
    );
}

export default ClassRoom;