import React, {useEffect, useState} from 'react';
import StorageContentIcons from "../components/Storage/StorageContentIcons";
import '../cssDirectory/storagePage.css';
import ReactDOM from "react-dom";
import Page from "./pageProvider";
import StorageElements from "../components/Storage/storageDB";
import StorageItem from "../components/Storage/storageItem";
import {srcUrl} from "../mySettings";
import {getLastFiles} from "../fetches/storage";
import {Switch} from "react-router";
import {Link} from "react-router-dom";
import {IStorageContentIconPaged} from "../projectTypes";

function StoragePage(/*storageElements?: any[]*/) {
    const [isLoadedFiles, setIsLoadedFiles] = useState(false);
    const [files, setFiles]: [any, any] = useState([]);
    const [path, setPath] = useState('');

    useEffect(() => {
        getLastFiles(10)
            .then(res => res.json())
            .then(res => {
                setFiles(makeTags(res));
                setIsLoadedFiles(true);
            });
    }, []);

    /*if (typeof storageElements == "undefined") {
    storageElements = StorageElements;
}*/

    function getPage(path: string) {
        console.log(path, 'PATHTEST');
        setPath(path);
        setIsLoadedFiles(false);
        fetch(`${srcUrl}/storage/${path}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(res => {
                setFiles(makeTags(res));
                setIsLoadedFiles(true);
            });
    }

    function getLast() {
        getLastFiles(10)
            .then(res => res.json())
            .then(res => {
                setFiles(makeTags(res));
                setIsLoadedFiles(true);
            });
    }

    function makeTags(res: any) {
        console.log(res, "RESULTOFSTORAGE");
        let result = [];
        for (let file of res) {
            result.push(<StorageItem type={file.isFile} name={file.path.split('\\').pop()} path={file.path}/>)
        }
        console.log(result, 'Testim!');
        return result;
    }

    function showStorage() {
        if (isLoadedFiles) {
            console.log(files, "scheduleDays!!!");
            // setIsLoadedPage(true);
            return files;
        } else {
            return null;
        }
    }

    function takeFile(event: any) {
        let target = event.target.closest('div');
        console.log(target, "OOO DAAAAA");
        if (target.id == 'storageContainer') {
            if (target.dataset.isfile === 'true') {
                fetch(`${srcUrl}/storage/${btoa(target.dataset.path.split('\\').splice(1).join('\\'))}`, {
                    credentials: "include"
                }).then(res => res.blob())
                    .then(blob => {
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement('a');
                        a.href = url;
                        a.download = target.dataset.path.split('\\').pop();
                        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                        a.click();
                        a.remove();  //afterwards we remove the element again
                    });
            } else {
                getPage(btoa(target.dataset.path.split('\\').splice(1).join('\\')));
            }
        } else {
            console.log(target);
        }
    }

    function choosePage() {
        if (path == '')
            return (
                <div id="storageContent">
                    <div id="header">
                        <div id="leftHeaderPart">
                            <p id="title">Последние загрузки</p>
                        </div>
                    </div>
                    <div id="icons" onClick={takeFile}>
                        {showStorage()}
                    </div>
                    <p id="title" onClick={() => {
                        getPage('IA==');
                    }}>Текущий семестр</p>
                    <p id="title" onClick={() => {
                        getPage(btoa('archive'));
                    }}>Архив</p>
                </div>
            );
        else
            return (
                <div id="storageContent">
                    <div id="header">
                        <div id="leftHeaderPart">
                            <button id="toMainStoragePageButton" onClick={() => {
                                if (path != 'IA==') {
                                    console.log(atob(path), "ЫЫЫЫЫЫ");
                                    let pathNow = atob(path);
                                    if (pathNow.split('\\').length === 1)
                                        pathNow = 'IA==';
                                    else
                                        pathNow = btoa(pathNow.split('\\').slice(0,-1).join('\\'));
                                    getPage(pathNow);
                                } else {
                                    console.log(path, "ЫЫЫЫЫ111Ы");
                                    setPath('');
                                    getLast();
                                }
                            }}/>
                            <p id="title">Текущий семестр</p>
                        </div>
                        <div id="rightHeaderPart">
                            {}
                        </div>
                    </div>
                    <div id="icons" onClick={takeFile}>
                        {showStorage()}
                    </div>
                </div>
            );
    }


    return <div>
        {choosePage()}
    </div>;
}

export default StoragePage