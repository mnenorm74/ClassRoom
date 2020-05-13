import React from "react";
import '../cssDirectory/storagePage.css';
import Page from "./pageProvider";
import ReactDOM from "react-dom";
import StorageElements from "../components/Storage/storageDB";
import StorageContentIcons from "../components/Storage/StorageContentIcons";

//TODO: получать текущий семестр из даты или как-то по-другому
let currentSemester = "6";

function StorageSemesterPage() {
    let elements = StorageElements.filter(file => file.semester === currentSemester);
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
                    <p id="title">Текущий семестр</p>
                </div>
                <div id="rightHeaderPart">
                    <button id="addToStorageButton"></button>
                </div>
            </div>
            <div id="icons">
                {StorageContentIcons(elements)}
            </div>
        </div>
    )
}


export default StorageSemesterPage