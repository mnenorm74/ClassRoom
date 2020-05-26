import React from "react";
import Popup from "reactjs-popup";
import '../ScheduleFull/lessonFull.css'

function lessonDeleting() {
    return (<Popup trigger={<p className="lessonOption">Удалить</p>} modal className={'deleting'}>
            {close => (
                <div className="modal" id="deletingModal">
                    <a className="close" onClick={close}>
                        &times;
                    </a>
                    <div className="header" id="deletingHeader">Удалить запись</div>
                    <div id="deletingOptions">
                        <p className="scheduleRadio"><input name="deleting" type="radio" checked/>Удалить текущую</p>
                        <p className="scheduleRadio"><input name="deleting" type="radio"/>Удалить все повторяющиеся</p>
                    </div>
                    <div className="modalFooter">
                        <button className="sendingButton">Удалить</button>
                    </div>
                </div>
            )}
        </Popup>);
}

export default lessonDeleting()