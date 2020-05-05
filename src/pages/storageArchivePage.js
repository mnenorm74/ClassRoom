import React from "react";
import StorageElements from "../components/Storage/storageDB";
import ReactDOM from "react-dom";
import Page from "./pageProvider";
import revertDisplay from "../components/Storage/storageViews";
import StorageContentTable from "../components/Storage/StorageContentTable";
import StorageContentIcons from "../components/Storage/StorageContentIcons";

function StorageArchivePage(isTable) {
    return (
        <div id="storageContent">
            <div id="header">
                <div id="leftHeaderPart">
                    <button id="toMainStoragePageButton" onClick={() => {
                        ReactDOM.render(
                            Page.StoragePage(),
                            document.getElementById('pageContainer')
                        );
                    }}/>
                    <p id="title">Архив</p>
                </div>
                <div id="rightHeaderPart">
                    <button id="viewButton" onClick={() => {
                        revertDisplay();
                        isTable = !isTable;
                    }}/>
                    <button id="addToStorageButton"></button>
                </div>
            </div>
            <div id="table">
                {StorageContentTable(StorageElements)}
            </div>
            <div id="icons">
                {StorageContentIcons(StorageElements)}
            </div>
        </div>
    )
}

export default StorageArchivePage