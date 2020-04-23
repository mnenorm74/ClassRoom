import React from "react";
import './menuItems.css'
import ReactDOM from "react-dom";

function MenuItem({link, text, img}) {
    return (
        <button className='button' onClick={event => {
            ReactDOM.render(
                link(),
                document.getElementById('pageContainer')
            );
        }}><i className={img}/>{text}</button>
    )
}

export default MenuItem