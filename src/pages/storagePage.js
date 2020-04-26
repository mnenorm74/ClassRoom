import React from 'react';
import StorageElements from "../components/Storage/storageDB";
import StorageTableItem from "../components/Storage/storageTableItem";
import StorageItem from "../components/Storage/storageItem";
import '../cssDirectory/storagePage.css';


function StoragePage() {
    return (
        <>
            <div id='header'>
                <p id="title">Последние загрузки</p>
                <button id="viewTypeButton" onClick={StoragePage}></button>
            </div>
            {iconsView()}
            <p id="title">Текущий семестр</p>
            <p id="title">Архив</p>
        </>
    )
}

function iconsView() {
    return (
        <div id="storage">
            {StorageElements.map(element => (
                <StorageItem type={element.type} name={element.name} owner={element.owner} date={element.date}/>
            ))}
        </div>
    )
}

function tableView() {
    return (
        <>
            <div id="tableHeader">
                <p>имя</p>
                <p>владелец</p>
                <p>дата</p>
            </div>
            <div id="tableStorage">
                {StorageElements.slice(0, 6).map(element => (
                    <StorageTableItem type={element.type} name={element.name} owner={element.owner}
                                      date={element.date}/>
                ))}
            </div>
        </>
    )
}

export default StoragePage