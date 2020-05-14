import React from 'react';
import './storage.css'

function StorageTableItem({type, name, owner, date}:{type:string, name:string, owner:string, date:string}) {
    let iconType = type === "folder" ? "folderTableIcon" : "fileTableIcon";
    return (
        <div id="storageTableContainer">
            <div id="tableName">
                <div id={iconType}/>
                <p>{name}</p>
            </div>
            <p>{owner}</p>
            <p>{date}</p>
        </div>
    )
}

export default StorageTableItem