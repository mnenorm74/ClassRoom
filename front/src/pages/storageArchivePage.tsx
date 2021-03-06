import React from "react";
import StorageElements from "../components/Storage/storageDB";
import ReactDOM from "react-dom";
import Page from "./pageProvider";
import StorageContentIcons from "../components/Storage/StorageContentIcons";
import storageAddingModal from "../components/modals/storageAddingModal";

function StorageArchivePage() {
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
                    {storageAddingModal}
                </div>
            </div>
            <div id="icons">
                {StorageContentIcons(StorageElements!)}
            </div>
        </div>
    )
}

export default StorageArchivePage