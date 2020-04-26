import React from 'react';
import './storage.css'

function storageItem({type, name, owner, date}) {
    let iconType = type === "folder" ? "folderIcon" : "fileIcon";
    return (
        <div id="storageContainer">
            <div id={iconType}></div>
            <div id="name">{name}</div>
        </div>
    );
}

export default storageItem