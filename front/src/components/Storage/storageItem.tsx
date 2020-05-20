import React from 'react';
import './storage.css'
import ReactDOM from "react-dom";
import Page from "../../pages/pageProvider";
import {IStorageContentIconPaged} from "../../projectTypes";

function storageItem({type, name, owner, date, content, pageElements}:IStorageContentIconPaged) {
    let iconType = type === "folder" ? "folderIcon" : "fileIcon";
    return (
        <div id="storageContainer">
            <div id={iconType} onClick={() => {
                if (type === "folder") {
                    ReactDOM.render(
                        Page.StorageContentPage(content, pageElements),
                        document.getElementById('pageContainer')
                    );
                }
            }}/>
            <div id="name">{name}</div>
        </div>
    );
}

export default storageItem