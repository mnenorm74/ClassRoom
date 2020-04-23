import React from 'react';
import './cssDirectory/class-room.css';
import Menu from './menu/menu'
import Page from "./pageProvider";

function App() {
    return (
        <div className="class-room">
            <Menu/>
            <div className="mainContent">
                <div id="pageContainer">
                    <Page.MainPage/>
                </div>
            </div>
        </div>
    );
}

export default App;