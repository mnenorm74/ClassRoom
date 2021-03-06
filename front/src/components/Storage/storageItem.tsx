import React from 'react';
import './storage.css'
import ReactDOM from "react-dom";
import Page from "../../pages/pageProvider";
import {IStorageContentIconPaged} from "../../projectTypes";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {srcUrl} from "../../mySettings";

function StorageItem({type, name, path}: {type: boolean, name: string, path: string}) {
    let iconType = type  ? "fileIcon" : "folderIcon";

    function deleteFile() {
        debugger;
        fetch(`${srcUrl}/storage/${btoa(path)}`,
            {
                method: "delete",
                credentials: "include"
            })
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <ContextMenuTrigger id="same_unique_identifier">
        <div id="storageContainer" data-path={path} data-isFile={type}>
            <img id={iconType} className={"icon"}/>
            <p id="name">{name}</p>
        </div>
            <ContextMenu className={'contextMenu'} id="same_unique_identifier">
                <MenuItem className={'contextItem'} data={{foo: 'bar'}} >
                    Архивировать
                </MenuItem>
                <MenuItem divider />
                <MenuItem className={'contextItem'} data={{foo: 'bar'}} /*onClick={deleteFile}*/>
                    Удалить
                </MenuItem>
            </ContextMenu>
        </ContextMenuTrigger>
    );
}

export default StorageItem