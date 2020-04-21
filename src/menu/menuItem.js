import React from "react";
import ReactDOM from "react-dom";

function MenuItem({link, text}) {
    return (
        <button onClick={event => {
            ReactDOM.render(
                link(),
                document.getElementById('pageContainer')
            );
        }}><i className="fa fa-file-o"/> {text}</button>
    )
}

export default MenuItem