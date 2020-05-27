import React from "react";
import Popup from "reactjs-popup";
import isEmptyField from "../../validation/isEmptyField";
import "../../components/Schedule/scheduleChanging.css"
import warnFullDateFormat from "../../validation/warnFullDateFormat";
import {srcUrl} from "../../mySettings";
import {farmatDateForm} from "../../fetches/schedule";
import warnTimeFormat from "../../validation/warnTimeFormat";
import warnEmptiness from "../../validation/warnEmptiness";
import isValidFullDate from "../../validation/isValidFullDate";
import isValidTime from "../../validation/isValidTime";

const formName = "scheduleAdding";

function isValidForm(): boolean {
    // @ts-ignore
    return isValidFullDate(document.forms[formName]["CreateDate"].value) && isValidTime(document.forms[formName]["StartTime"].value) && isValidTime(document.forms[formName]["EndTime"].value)
        && !isEmptyField(formName, "Title") && !isEmptyField(formName, "Audience") && !isEmptyField(formName, "Teacher");
}

function scheduleAdding() {

    function onSubmit() {
        /*if (!isValidForm()) {
            return;
        }*/
        let form: any = document.forms.namedItem(formName);
        let formData = new FormData(form);
        let date: any = formData.get("CreateDate");
        let newDate: any = farmatDateForm(date);
        formData.set("CreateDate", newDate);
        fetch(`${srcUrl}/Schedules`, {
            method: 'post',
            headers: {
                //'Content-Type': 'multipart/form-data'
            },
            credentials: "include",
            body: formData
        });

    }

    return (<Popup trigger={<button id="newsAdding"/>} modal>
        {close => (
            <>
                <form name={formName} className="modal" onChange={() => {
                    //@ts-ignore
                    document.getElementById("scheduleAddingButton").disabled = !isValidForm();
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
                                    <input name="CreateDate" className="text" id="dateInput" placeholder="XX:XX:XXXX"
                                           onChange={() => {
                                               warnFullDateFormat(formName, "CreateDate", "lessonDate")
                                           }}/>
                                    <span className="modalContentStatus" id="lessonDate">Дата должна быть в формате DD:MM:YYYY</span>
                                </div>
                                <div id="timePeriod">
                                    <input name="StartTime" className="timeInput" id="timeStart" placeholder="XX:XX"
                                           onChange={() => {
                                               warnTimeFormat(formName, "StartTime", "EndTime", "lessonTime")
                                           }}/>
                                    <span className="textBetween">—</span>
                                    <input name="EndTime" className="timeInput" id="timeEnd" placeholder="XX:XX"
                                           onChange={() => {
                                               warnTimeFormat(formName, "StartTime", "EndTime", "lessonTime")
                                           }}/>
                                    <span className="modalContentStatus" id="lessonTime">Время должно быть в формате ХХ:ХХ</span>
                                </div>
                            </div>
                        </div>
                        <div className="scheduleModalLine">
                            <span className="modalScheduleHeader">Название</span>
                            <span className="modalContentStatus" id="lessonName">Название не может быть пустым</span>
                        </div>
                        <input name="Title" type="text" className="scheduleInput" onChange={() =>
                            warnEmptiness(formName, "Title", "lessonName")}/>
                        <span className="modalScheduleHeader">Тип</span>
                        <select name="Type" className="scheduleInput">
                            <option value="lecture">Лекция</option>
                            <option value="practice">Практика</option>
                            <option value="lab">Лабораторная работа</option>
                        </select>
                        <div className="scheduleModalLine">
                            <span className="modalScheduleHeader">Аудитория</span>
                            <span className="modalContentStatus"
                                  id="roomNumber">Номер аудитории не может быть пустым</span>
                        </div>
                        <input name="Audience" type="text" className="scheduleInput" onChange={() => {
                            warnEmptiness(formName, "Audience", "roomNumber")
                        }}/>
                        {/*<select className="scheduleInput">
                        <option>Р-325</option>
                        <option>Р-339</option>
                    </select>*/}
                        <div className="scheduleModalLine">
                            <span className="modalScheduleHeader">Преподаватель</span>
                            <span className="modalContentStatus"
                                  id="teacherName">Имя преподавателя не может быть пустым</span>
                        </div>
                        <input name="Teacher" type="text" className="scheduleInput" onChange={() => {
                            warnEmptiness(formName, "Teacher", "teacherName")
                        }}/>
                        <span className="modalScheduleHeader">Повторять</span>
                        <p className="scheduleRadio"><input name="RepeatCount" value="1" type="radio" defaultChecked/>Нет</p>
                        <p className="scheduleRadio"><input name="RepeatCount" value="7" type="radio"/>Раз в неделю</p>
                        <p className="scheduleRadio"><input name="RepeatCount" value="14" type="radio"/>Раз в две недели
                        </p>
                        <p className="scheduleRadio"><input name="RepeatCount" value="30" type="radio"/>Раз в месяц</p>
                    </div>
                    <div className="modalFooter">
                        <button className="sendingButton" id="scheduleAddingButton" onClick={onSubmit}>Добавить</button>
                    </div>
                </form>

            </>
        )}
    </Popup>);
}

export default scheduleAdding()