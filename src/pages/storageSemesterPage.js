import React from "react";
import '../cssDirectory/storagePage.css';
import Page from "./pageProvider";
import ReactDOM from "react-dom";
import StorageContentTable from "../components/Storage/StorageContentTable";
import StorageElements from "../components/Storage/storageDB";
import StorageContentIcons from "../components/Storage/StorageContentIcons";
import revertDisplay from "../components/Storage/storageViews";
import StorageAdding from "../components/modals/StorageAdding";

//TODO: получать текущий семестр из даты или как-то по-другому
let currentSemester = "6";

function StorageSemesterPage(isTable) {
    let elements = StorageElements.filter(file => file.semester === currentSemester);
    return (
        <>
            {StorageAdding()}
            <div id="storageContent">
                <div id="header">
                    <div id="leftHeaderPart">
                        <button id="toMainStoragePageButton" onClick={() => {
                            ReactDOM.render(
                                Page.StoragePage(),
                                document.getElementById('pageContainer')
                            );
                        }}/>
                        <p id="title">Текущий семестр</p>
                    </div>
                    <div id="rightHeaderPart">
                        <button id="viewButton" onClick={() => {
                            revertDisplay();
                            isTable = !isTable;
                        }}/>
                        <button id="addToStorageButton" onClick={() => {
                            let modalWindow = document.getElementById('storageModal');
                            if (modalWindow.style.display != 'inline')
                                modalWindow.style.display = 'inline';
                            let background = document.getElementById('background');
                            if (background.style.display != 'inline')
                                background.style.display = 'inline';
                        }}/>
                    </div>
                </div>
                <div id="table">
                    {StorageContentTable(elements)}
                </div>
                <div id="icons">
                    {StorageContentIcons(elements)}
                </div>
            </div>
        </>
    )
}

export default StorageSemesterPage