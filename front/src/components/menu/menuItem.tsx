import React from "react";
import './menuItems.css'
import ReactDOM from "react-dom";

function MenuItem({link, text}:{link:()=>JSX.Element, text:string}) {
    return (
        <div className='navMenuItem' onClick={() => {
            ReactDOM.render(
                link(),
                document.getElementById('pageContainer')
            );
        }}>
            <span className='itemName'>{text}</span>
        </div>
    )
}

export default MenuItem