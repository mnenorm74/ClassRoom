import React from "react";
import Popup from "reactjs-popup";
import isEmptyField from "../../validation/isEmptyField";
import "../../components/Schedule/scheduleChanging.css"
import warnFullDateFormat from "../../validation/warnFullDateFormat";

const formName = "scheduleAdding";

function isValidForm(): boolean {
    return false;
}

function scheduleAdding() {
    return (<Popup trigger={<button id="newsAdding"></button>} modal>
        {close => (
            <form name={formName} className="modal" onSubmit={() => {
                //TODO Отправка формы
                if (isValidForm()) {
                    alert("отправляю")
                } else {
                    alert("не отправляю")
                }
            }}>
                <a className="close" onClick={close}>
                    &times;
                </a>
                <div className="header">ДОБАВИТЬ ЗАПИСЬ В РАСПИСАНИЕ</div>
                <div className="content">
                    <div id="timeContentPart">
                        <div id="timeHeaders">
                            <span className="text">Дата</span>
                            <span className="text">Время</span>
                        </div>
                        <div id="timeInputs">
                            <div id="timePeriod">
                                <input name="fillDate" className="text" id="dateInput" placeholder="XX:XX:XXXX" onChange={() => {
                                    warnFullDateFormat(formName, "fillDate", "lessonDate")
                                }}/>
                                <span className="modalContentStatus" id="lessonDate">Дата должна быть в формате DD:MM:YYYY</span>
                            </div>
                            <div id="timePeriod">
                                <input className="timeInput" id="timeStart" placeholder="XX:XX"/>
                                <span className="textBetween">—</span>
                                <input className="timeInput" id="timeEnd" placeholder="XX:XX"/>
                            </div>
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
                    <span className="modalScheduleHeader">Повторять</span>
                    <p className="scheduleRadio"><input name="repeat" type="radio" checked/>Нет</p>
                    <p className="scheduleRadio"><input name="repeat" type="radio"/>Раз в неделю</p>
                    <p className="scheduleRadio"><input name="repeat" type="radio"/>Раз в две недели</p>
                    <p className="scheduleRadio"><input name="repeat" type="radio"/>Раз в месяц</p>
                </div>
                <div className="modalFooter">
                    <button className="sendingButton">Добавить</button>
                </div>
            </form>
        )}
    </Popup>);
}

export default scheduleAdding()