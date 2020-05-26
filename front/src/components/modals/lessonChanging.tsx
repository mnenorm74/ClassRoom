import React from "react";
import Popup from "reactjs-popup";
import '../ScheduleFull/lessonFull.css'

function lessonChanging() {
    return (<Popup trigger={<p className="lessonOption">Изменить</p>} modal className={'deleting'}>
        {close => (
            <div className="modal" id="deletingModal">
                <a className="close" onClick={close}>
                    &times;
                </a>
                <div className="header" id="deletingHeader">Изменить запись</div>

                <div className="content" id="changingContent">
                    <div id="timeContentPart">
                        <span className="text" id="changingHeader">Время</span>

                            <div id="timePeriod">
                                <input className="timeInput" id="timeStart" placeholder="XX:XX"/>
                                <span className="textBetween">—</span>
                                <input className="timeInput" id="timeEnd" placeholder="XX:XX"/>
                            </div>

                    </div>
                    <span className="modalScheduleHeader">Название</span>
                    <input type="text" className="scheduleInput"/>
                    <span className="modalScheduleHeader">Тип</span>
                    <select className="scheduleInput">
                        <option>Лекция</option>
                        <option>Практика</option>
                    </select>
                    <span className="modalScheduleHeader">Аудитория</span>
                    <select className="scheduleInput">
                        <option>Р-325</option>
                        <option>Р-339</option>
                    </select>
                    <span className="modalScheduleHeader">Преподаватель</span>
                    <input type="text" className="scheduleInput"/>
                    <span className="modalScheduleHeader">Применить для</span>
                    <p className="scheduleRadio"><input name="deleteRepeating" type="radio" checked/>Текущей записи</p>
                    <p className="scheduleRadio"><input name="deleteRepeating" type="radio"/>Всех повторяющихся записей</p>
                </div>
                <div className="modalFooter" id="changingFooter">
                    <button className="sendingButton">Изменить</button>
                </div>
            </div>
        )}
    </Popup>);
}

export default lessonChanging()