import React from 'react';
import './storageAdding.css'

function StorageAdding() {
    return (
        <div id='storageModal'>
            <div id="modalHeader">
                <h3 id="headerText">Добавить папку</h3>
                <button id="closeModalButton" onClick={() => {
                    let modalWindow = document.getElementById('storageModal');
                    if (modalWindow.style.display != 'none')
                        modalWindow.style.display = 'none';
                    let background = document.getElementById('background');
                    if (background.style.display != 'none')
                        background.style.display = 'none';
                }}/>
            </div>
            <p id="subtitle">Тип</p>
            <div id="radio">
                <p id="radioLine"><input name="addingType" type="radio" value="file"/>Файл</p>
                <p id="radioLine"><input name="addingType" type="radio" value="folder" checked/>Папка</p>
            </div>
            <div id="folderAdding">
                <p id="subtitle">Имя</p>
                <input id="folderName" type="input"/>
            </div>
            <div id="fileAdding">

            </div>
        </div>
    )
}

export default StorageAdding