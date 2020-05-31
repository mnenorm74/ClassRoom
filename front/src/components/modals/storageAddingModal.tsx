import React from "react";
import Popup from "reactjs-popup";
import isEmptyField from "../../validation/isEmptyField";
import warnEmptiness from "../../validation/warnEmptiness";
import "../../cssDirectory/storagePage.css"
import {srcUrl} from "../../mySettings";

const formName = "storageAdding";

function isValidForm(loaded: boolean): boolean {
    // @ts-ignore
    return (!isEmptyField(formName, "folderName") && document.getElementById("radioFolderType").checked)
        // @ts-ignore
        || (!document.getElementById("radioFolderType").checked && loaded);
}

function checkRadioState() {
    // @ts-ignore
    if (document.getElementById("radioFolderType").checked) {
        document.getElementById("fileAddingField")!.style!.display = "none";
        document.getElementById("folderAddingField")!.style!.display = "block";
    } else {
        document.getElementById("fileAddingField")!.style!.display = "block";
        document.getElementById("folderAddingField")!.style!.display = "none";
    }
}

function storageAddingModal(path: string) {
    let fileLoaded = true;

    function onSubmit() {
        // @ts-ignore
        document.querySelector('.sendingButton').setAttribute("disabled", "true");

        let form: any = document.forms.namedItem(formName);
        let formData = new FormData();
        formData.append('file', form['fileAdding'].files[0]);

        debugger;

        console.log(form);

        // @ts-ignore
        if (document.getElementById("radioFolderType").checked) {
            let resultPath = '';
            if(path === "IA==")
                resultPath = btoa(atob(path) + form['folderName'].value);
            else
                resultPath = btoa(atob(path) + '\\' + form['folderName'].value);
            fetch(`${srcUrl}/storage/${resultPath}`, {
                method: "post",
                credentials: "include"
            });
        } else {
            let resultPath = '';
            if(path === "IA==")
                resultPath = btoa(atob(path) + form['fileAdding'].files[0].name);
            else
                resultPath = btoa(atob(path) + '\\' + form['fileAdding'].files[0].name);
            fetch(`${srcUrl}/storage/${resultPath}`, {
                method: "post",
                credentials: "include",
                body: formData
            });
        }
        // if (!isValidForm(fileLoaded)) {
        //
        // }
    }

    return (<Popup trigger={<button id="newsAdding"/>} modal>
        {close => (
            <form name={formName} className="modal" onSubmit={onSubmit}/*onSubmit={(e) => {
                e.preventDefault();
                window.location.reload();
            }} onChange={() => {
                // if (!isValidForm(fileLoaded)) {
                //     // @ts-ignore
                //     document.querySelector('.sendingButton').setAttribute("disabled", "true")
                // } else {
                //     // @ts-ignore
                //     document.querySelector('.sendingButton').removeAttribute("disabled")
                // }
            }}*/>
                <a className="close" onClick={close}>
                    &times;
                </a>
                <div className="header">ДОБАВИТЬ ФАЙЛ</div>
                <div className="content" id="archiveStorageAddingContent">
                    <span className="modalScheduleHeader">Тип</span>
                    <p className="scheduleRadio"><input name="fileType" type="radio"
                                                        onClick={checkRadioState} id="radioFileType"/>Файл
                    </p>
                    <p className="scheduleRadio"><input name="fileType" type="radio"
                                                        onClick={checkRadioState} id="radioFolderType"/>Папка
                    </p>
                    <div id="fileAddingField">
                        <div className="form-group">
                            <label className="label">
                                <i className="loadIcon"/>
                                <span className="title">Добавить файл</span>
                                <input name="fileAdding" type="file"/>
                            </label>
                        </div>
                        <div className="modalFooter" id="storageArchiveSendFile">
                            <button className="sendingButton">Добавить</button>
                        </div>
                    </div>
                    <div id="folderAddingField">
                            <span className="modalContentStatus"
                                  id="folderAddingName">Название не может быть пустым</span>
                        <input type="text" placeholder="Название папки" name="folderName" id="folderName"
                               onChange={() => {
                                   warnEmptiness(formName, "folderName", "folderAddingName")
                               }}/>
                        <div className="modalFooter" id="storageArchiveSendFolder">
                            <button type="submit" id="storageAddingButton" className="sendingButton"
                                /*onClick={onSubmit}*/>Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )}
    </Popup>);
}


export default storageAddingModal