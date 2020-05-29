import React from "react";
import Popup from "reactjs-popup";
import '../ScheduleFull/lessonFull.css'
import {formatDateForm} from "../../fetches/schedule";
import {srcUrl} from "../../mySettings";
import warnTimeFormat from "../../validation/warnTimeFormat";
import warnEmptiness from "../../validation/warnEmptiness";
import isValidFullDate from "../../validation/isValidFullDate";
import isValidTime from "../../validation/isValidTime";
import isEmptyField from "../../validation/isEmptyField";

const formName = "scheduleChangingLesson";

function isValidForm() {
    // @ts-ignore
    return isValidTime(document.forms[formName]["StartTime"].value) && isValidTime(document.forms[formName]["EndTime"].value)
        && !isEmptyField(formName, "Title") && !isEmptyField(formName, "Audience") && !isEmptyField(formName, "Teacher");
}

function lessonChanging(id: any, day: any) {

    function onSubmit() {
        if (!isValidForm()) {
            // @ts-ignore
            document.querySelector('.sendingButton').setAttribute("disabled", "true")
            return;
        }
        let form: any = document.forms.namedItem(formName);
        let formData = new FormData(form);

        let all: any = formData.get("deleteRepeating");
        //let newDate : any = farmatDateForm(date);
        formData.delete("deleteRepeating");
        let date = new Date(day);
        let newDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        console.log(newDate, "DAYY");
        console.log(id, "ID");

        fetch(`${srcUrl}/Schedules/${newDate}/${id}?all=${all === "true"}`, {
            method: 'patch',
            headers: {
                //'Content-Type': 'multipart/form-data'
            },
            credentials: "include",
            body: formData
        });

    }

    return (<Popup trigger={<p className="lessonOptionItem">Изменить</p>} modal className={'deleting'}>
        {close => (
            <>
                <form name={formName} className="modal" onChange={() => {
                    if (!isValidForm()) {
                        // @ts-ignore
                        document.querySelector('.sendingButton').setAttribute("disabled", "true")
                    } else {
                        // @ts-ignore
                        document.querySelector('.sendingButton').removeAttribute("disabled")
                    }
                }}>
                    <div className="modal" id="deletingModal">
                        <a className="close" onClick={close}>
                            &times;
                        </a>
                        <div className="header" id="deletingHeader">Изменить запись</div>

                        <div className="content" id="changingContent">
                            <div id="timeContentPart">
                                <span className="text" id="changingHeader">Время</span>

                                <div id="timePeriod">
                                    <input name={"StartTime"} className="timeInput" id="timeStart" placeholder="XX:XX"
                                           onChange={() => {
                                               warnTimeFormat(formName, "StartTime", "EndTime", "changingLessonTime")
                                           }}/>
                                    <span className="textBetween">—</span>
                                    <input name={"EndTime"} className="timeInput" id="timeEnd" placeholder="XX:XX"
                                           onChange={() => {
                                               warnTimeFormat(formName, "StartTime", "EndTime", "changingLessonTime")
                                           }}/>
                                    <span className="modalContentStatus" id="changingLessonTime">Время должно быть в формате ХХ:ХХ</span>
                                </div>

                            </div>
                            <div className="scheduleModalLine">
                                <span className="modalScheduleHeader">Название</span>
                                <span className="modalContentStatus"
                                      id="changingLessonName">Название не может быть пустым</span>
                            </div>
                            <input name={"Title"} type="text" className="scheduleInput" onChange={() =>
                                warnEmptiness(formName, "Title", "changingLessonName")}/>
                            <span className="modalScheduleHeader">Тип</span>
                            <select name="Type" className="scheduleInput">
                                <option value="lecture">Лекция</option>
                                <option value="practice">Практика</option>
                                <option value="lab">Лабораторная работа</option>
                            </select>
                            <div className="scheduleModalLine">
                                <span className="modalScheduleHeader">Аудитория</span>
                                <span className="modalContentStatus"
                                      id="changingRoomNumber">Номер аудитории не может быть пустым</span>
                            </div>
                            <input name="Audience" type="text" className="scheduleInput" onChange={() => {
                                warnEmptiness(formName, "Audience", "changingRoomNumber")
                            }}/>
                            <div className="scheduleModalLine">
                                <span className="modalScheduleHeader">Преподаватель</span>
                                <span className="modalContentStatus"
                                      id="changingTeacherName">Имя преподавателя не может быть пустым</span>
                            </div>
                            <input name="Teacher" type="text" className="scheduleInput" onChange={() => {
                                warnEmptiness(formName, "Teacher", "changingTeacherName")
                            }}/>
                            <span className="modalScheduleHeader">Применить для</span>
                            <p className="scheduleRadio"><input name="deleteRepeating" value={"false"} type="radio" defaultChecked/>Текущей
                                записи
                            </p>
                            <p className="scheduleRadio"><input name="deleteRepeating" value={"true"} type="radio"/>Всех повторяющихся
                                записей</p>
                        </div>
                        <div className="modalFooter" id="changingFooter">
                            <button className="sendingButton" id="scheduleChangingButton" onClick={onSubmit}>
                                Изменить
                            </button>
                        </div>
                    </div>
                </form>

            </>
        )}
    </Popup>);
}

export default lessonChanging