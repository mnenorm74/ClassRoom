import React, {useState} from 'react';
import StorageContentIcons from "../components/Storage/StorageContentIcons";
import '../cssDirectory/storagePage.css';
import ReactDOM from "react-dom";
import Page from "./pageProvider";
import StorageElements from "../components/Storage/storageDB";

function StoragePage(/*storageElements?: any[]*/) {
    const [isLoadedFiles, setIsLoadedFiles] = useState(false);
    const [files, setFiles]: [any, any] = useState([]);
   /* if (typeof storageElements == "undefined") {
        storageElements = StorageElements;
    }*/
    let storageElements = StorageElements;
    return (
        <div id="storageContent">
            <div id="header">
                <div id="leftHeaderPart">
                    <button id="goBackButton" onClick={() => {
                        ReactDOM.render(
                            Page.StoragePage(),
                            document.getElementById('pageContainer')
                        );
                    }}/>
                    <p id="title">Последние загрузки</p>
                </div>
            </div>
            <div id="icons">
                {StorageContentIcons(storageElements.slice(0, 16))}
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
}

export default StoragePage