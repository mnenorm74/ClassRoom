import React from 'react';
import './storage.css'
import ReactDOM from "react-dom";
import Page from "../../pages/pageProvider";
import {IStorageContentIconPaged} from "../../projectTypes";

function StorageItem({type, name, path}: {type: boolean, name: string, path: string}) {
    let iconType = type  ? "fileIcon" : "folderIcon";
    return (
        <div id="storageContainer" data-path={path} data-isFile={type}>
            <image id={iconType} path={path}/>
            <div id="name">{name}</div>
        </div>
    );
}

export default StorageItem