import React, {useEffect, useState} from 'react';
import StorageContentIcons from "../components/Storage/StorageContentIcons";
import '../cssDirectory/storagePage.css';
import ReactDOM from "react-dom";
import Page from "./pageProvider";
import StorageElements from "../components/Storage/storageDB";
import StorageItem from "../components/Storage/storageItem";
import {srcUrl} from "../mySettings";
import {getLastFiles} from "../fetches/storage";

function StoragePage(/*storageElements?: any[]*/) {
    const [isLoadedFiles, setIsLoadedFiles] = useState(false);
    const [files, setFiles]: [any, any] = useState([]);
    useEffect(() => {
        getLastFiles(10)
            .then(res => res.json())
            .then(res => {
                setIsLoadedFiles(true);
                setFiles(makeTags(res));
            });
    }, []);

    /*if (typeof storageElements == "undefined") {
    storageElements = StorageElements;
}*/


    function makeTags(res : any) {
        console.log(res,"RESULTOFSTORAGE")
        let result = [];
        for(let file of res){
            result.push(<StorageItem type={file.isFile} name={file.path.split('\\').pop()} path={file.path}/>)
        }
        return result;
    }

    function showStorage() {
        if (isLoadedFiles) {
            console.log(files, "scheduleDays!!!");
            return files;
        } else {
            return null;
        }
    }

    function takeFile(event : any) {
        let target = event.target;
        if(target.id == 'storageContainer') {
            console.log(target, "eventTarget");
            fetch(`${srcUrl}/storage/${btoa(target.dataset.path)}`, {
                credentials: "include"
            }).then(res => res);
        } else {
            console.log(target);
        }
    }

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
            <div id="icons" onClick={takeFile}>
                {showStorage()}
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