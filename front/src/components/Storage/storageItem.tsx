import React from 'react';
import './storage.css'
import ReactDOM from "react-dom";
import Page from "../../pages/pageProvider";
import {IStorageContentIconPaged} from "../../projectTypes";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

function StorageItem({type, name, path}: {type: boolean, name: string, path: string}) {
    let iconType = type  ? "fileIcon" : "folderIcon";
    return (
        <ContextMenuTrigger id="same_unique_identifier">
        <div id="storageContainer" data-path={path} data-isFile={type}>
            <div id={iconType} className={'icon'}/>
            <div id="name">{name}</div>
        </div>
            <ContextMenu className={'contextMenu'} id="same_unique_identifier">
                <MenuItem className={'contextItem'} data={{foo: 'bar'}} >
                    Скачать
                </MenuItem>
                <MenuItem className={'contextItem'} data={{foo: 'bar'}} >
                    Архивировать
                </MenuItem>
                <MenuItem divider />
                <MenuItem className={'contextItem'} data={{foo: 'bar'}} >
                    Удалить
                </MenuItem>
            </ContextMenu>
        </ContextMenuTrigger>
    );
}

export default StorageItem