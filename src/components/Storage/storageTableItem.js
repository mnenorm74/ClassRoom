import React from 'react';
import './storage.css'

function StorageTableItem({type, name, owner, date}) {
    let iconType = type === "folder" ? "folderTableIcon" : "fileTableIcon";
    return (
        <div id="storageTableContainer">
            <div id="tableName">
                <div id={iconType}></div>
                <p>{name}</p>
            </div>
            <p>{owner}</p>
            <p>{date}</p>
        </div>
    )
}

export default StorageTableItem