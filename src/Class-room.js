import React from 'react';
import './class-room.css';
import Menu from './menu/menu'

function App() {
    return (
        <div className="class-room">
            <Menu/>
            <div className="mainContent">
                <div id="pageContainer"/>
            </div>
        </div>
    );
}

export default App;