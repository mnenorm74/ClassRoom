import React from 'react';
import StorageContentTable from "../components/Storage/StorageContentTable";
import StorageContentIcons from "../components/Storage/StorageContentIcons";
import '../cssDirectory/storagePage.css';
import ReactDOM from "react-dom";
import Page from "./pageProvider";


const StoragePage = () =>{
    return (
        <div id="storageContent">
            <div id="header">
                <p id="title">Последние загрузки</p>
                <button id="viewTypeButton" onClick={revertDisplay}></button>
            </div>
            <div id="table">
                {StorageContentTable()}
            </div>
            <div id="icons">
                {StorageContentIcons()}
            </div>
            <p id="title" onClick={() => {
                ReactDOM.render(
                    Page.StorageSemesterPage(),
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

    function revertDisplay() {
        let tableStorage = document.getElementById('table');
        let iconStorage = document.getElementById('icons');

        if (tableStorage.style.display == 'none')
        {
            tableStorage.style.display = 'inline';
            iconStorage.style.display = 'none';
        }
        else
        {
            tableStorage.style.display = 'none';
            iconStorage.style.display = 'inline';
        }
    }
}

export default StoragePage