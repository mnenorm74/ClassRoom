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
                    {/*<div id="deletingOptions">
                        <p className="scheduleRadio"><input name="deleting" type="radio" checked/>Удалить текущую</p>
                        <p className="scheduleRadio"><input name="deleting" type="radio"/>Удалить все повторяющиеся</p>
                    </div>*/}
                    <p id="deletingMessage">Данная запись будет удалена из всех дней. Вы уверены, что хотите продлжить?</p>
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