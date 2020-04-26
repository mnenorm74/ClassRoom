import React from 'react';
import './storage.css'

function StorageTableItem({type, name, owner, date}) {
    return (
        <div id="storageTableContainer">
            <p>{name}</p>
            <p>{owner}</p>
            <p>{date}</p>
        </div>
    )
}

export default StorageTableItem