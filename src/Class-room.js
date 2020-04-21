import React from 'react';
import './class-room.css';
import Menu from './menu/menu'
import PageContainer from "./pageContainer";

function App() {
    return (
        <div className="class-room">
            <Menu></Menu>
            <div className="mainContent">
               {/* <PageContainer component={Menu}/>*/}
                <div id="pageContainer"></div>
            </div>
        </div>
    );
}

export default App;