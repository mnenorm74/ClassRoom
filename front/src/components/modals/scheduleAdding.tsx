import React from "react";
import Popup from "reactjs-popup";
import isEmptyField from "../../validation/isEmptyField";
import "../../components/Schedule/scheduleChanging.css"
import warnFullDateFormat from "../../validation/warnFullDateFormat";
import {srcUrl} from "../../mySettings";
import {farmatDateForm} from "../../fetches/schedule";

const formName = "scheduleAdding";

function isValidForm(): boolean {
    return true;
}

function scheduleAdding() {

    function onSubmit() {
        if (!isValidForm()) {
            return;
        }
        let form : any = document.forms.namedItem(formName);
        let formData = new FormData(form);
        let date : any = formData.get("CreateDate");
        let newDate : any = farmatDateForm(date);
        formData.set("CreateDate", newDate);
        fetch(`${srcUrl}/Schedules`, {
            method: 'post',
            headers: {
                //'Content-Type': 'multipart/form-data'
            },
            body: formData
        });

    }

    return (<Popup trigger={<button id="newsAdding"></button>} modal>
        {close => (
            <>
            <form name={formName} className="modal">
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
                                <input name="CreateDate" className="text" id="dateInput" placeholder="XX:XX:XXXX" onChange={() => {
                                    warnFullDateFormat(formName, "CreateDate", "lessonDate")
                                }}/>
                                <span className="modalContentStatus" id="lessonDate">Дата должна быть в формате DD:MM:YYYY</span>
                            </div>
                            <div id="timePeriod">
                                <input name="StartTime" className="timeInput" id="timeStart" placeholder="XX:XX"/>
                                <span className="textBetween">—</span>
                                <input name="EndTime" className="timeInput" id="timeEnd" placeholder="XX:XX"/>
                            </div>
                        </div>
                    </div>
                    <span className="modalScheduleHeader">Название</span>
                    <input name="Title" type="text" className="scheduleInput"/>
                    <span className="modalScheduleHeader">Тип</span>
                    <select name="Type" className="scheduleInput">
                        <option value="lecture">Лекция</option>
                        <option value="practice">Практика</option>
                        <option value="lab">Лабораторная работа</option>
                    </select>
                    <span className="modalScheduleHeader">Аудитория</span>
                    <input name="Audience" type="text" className="scheduleInput"/>
                    {/*<select className="scheduleInput">
                        <option>Р-325</option>
                        <option>Р-339</option>
                    </select>*/}
                    <span className="modalScheduleHeader">Преподаватель</span>
                    <input name="Teacher" type="text" className="scheduleInput"/>
                    <span className="modalScheduleHeader">Повторять</span>
                    <p className="scheduleRadio"><input name="RepeatCount" value="1" type="radio" checked/>Нет</p>
                    <p className="scheduleRadio"><input name="RepeatCount" value="7" type="radio"/>Раз в неделю</p>
                    <p className="scheduleRadio"><input name="RepeatCount" value="14" type="radio"/>Раз в две недели</p>
                    <p className="scheduleRadio"><input name="RepeatCount" value="30" type="radio"/>Раз в месяц</p>
                </div>
                <div className="modalFooter">
                    <button className="sendingButton" onClick={() => {onSubmit()}}>Добавить</button>
                </div>
            </form>
            </>
        )}
    </Popup>);
}

export default scheduleAdding()