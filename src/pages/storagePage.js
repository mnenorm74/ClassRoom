import React from 'react';
import StorageContentTable from "../components/Storage/StorageContentTable";
import StorageContentIcons from "../components/Storage/StorageContentIcons";
import revertDisplay from "../components/Storage/storageViews";
import '../cssDirectory/storagePage.css';
import ReactDOM from "react-dom";
import Page from "./pageProvider";
import StorageElements from "../components/Storage/storageDB";


function StoragePage() {
    let isTable = true;
    return (
        <div id="storageContent">
            <div id="header">
                <p id="title">Последние загрузки</p>
                <button id="viewTypeButton" onClick={() => {
                    revertDisplay();
                    isTable = !isTable;
                }}/>
            </div>
            <div id="table">
                {StorageContentTable(StorageElements.slice(0, 6))}
            </div>
            <div id="icons">
                {StorageContentIcons(StorageElements.slice(0, 16))}
            </div>
            <p id="title" onClick={() => {
                ReactDOM.render(
                    Page.StorageSemesterPage(isTable),
                    document.getElementById('pageContainer')
                );
            }}>Текущий семестр</p>
            <p id="title" onClick={() => {
                ReactDOM.render(
                    Page.StorageArchivePage(),
                    document.getElementById('pageContainer')
                );
            }}>Архив</p>
        </div>
    );
}

export default StoragePage