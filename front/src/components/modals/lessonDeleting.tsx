import React from "react";
import Popup from "reactjs-popup";
import '../ScheduleFull/lessonFull.css'
import {srcUrl} from "../../mySettings";
const formName = "scheduleDeletingLesson";

function lessonDeleting(id:any, day:any) {
    function onSubmit() {
        let date = new Date(day);
        let newDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        fetch(`${srcUrl}/Schedules/${newDate}/${id}`, {
            method: 'delete',
            credentials: "include"
        });

    }

    return (<Popup trigger={<p className="lessonOption">Удалить</p>} modal className={'deleting'}>
            {close => (
                <form name={formName}>
                <div className="modal" id="deletingModal">
                    <a className="close" onClick={close}>
                        &times;
                    </a>
                    <div className="header" id="deletingHeader">Удалить запись</div>
                    <div id="deletingOptions">
                        <p className="scheduleRadio">Вы уверены?</p>
                    </div>
                    <div className="modalFooter">
                        <button className="sendingButton" onClick={onSubmit}>Да</button>
                        <button className="sendingButton">Нет</button>
                    </div>
                </div>
                </form>
            )}
        </Popup>);
}

export default lessonDeleting