import React from "react";

function MenuItem({link, text}) {
    return (
        <button onClick={event => {
            let container = document.querySelector('#pageContainer');
            container.innerHTML = '';
            console.dir(link);
            container.insertAdjacentHTML('afterbegin',(link))
        }}><i className="fa fa-file-o"/> {text}</button>
    )
}

export default MenuItem