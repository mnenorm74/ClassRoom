import React from "react";
import ReactDOM from "react-dom";

function menuOption(name: string, link: () => JSX.Element) {
    return (
        <div className='menuOption' onClick={() => {
            ReactDOM.render(
                link(),
                document.getElementById('pageContainer')
            );
        }}>
            <span id='optionName'>{name}</span>
        </div>
    )
}

export default menuOption