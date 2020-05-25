import React from "react";
import Popup from "reactjs-popup";

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

function storageAddingModal() {
    return (<Popup trigger={<button id="newsAdding"></button>} modal>
        {close => (
            <div className="modal">
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
                                <i className="loadIcon"></i>
                                <span className="title">Добавить файл</span>
                                <input type="file"/>
                            </label>
                        </div>
                        <div className="modalFooter" id="storageArchiveSendFile">
                            <button className="sendingButton">Добавить</button>
                        </div>
                    </div>
                    <div id="folderAddingField">
                        <input type="text" placeholder="Название папки" id="folderName"/>
                        <div className="modalFooter" id="storageArchiveSendFolder">
                            <button className="sendingButton">Добавить</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </Popup>);
}

export default storageAddingModal()