import React from "react";
import Popup from "reactjs-popup";
import '../ScheduleFull/lessonFull.css'
import {farmatDateForm} from "../../fetches/schedule";
import {srcUrl} from "../../mySettings";
const formName = "scheduleChangingLesson";

function lessonChanging(id : any, day:any) {
    function onSubmit() {
        /*if (!isValidForm()) {
            return;
        }*/
        let form : any = document.forms.namedItem(formName);
        let formData = new FormData(form);
        let all : any = formData.get("deleteRepeating");
        //let newDate : any = farmatDateForm(date);
        formData.delete("deleteRepeating");
        let date = new Date(day);
        let newDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        console.log(newDate, "DAYY");
        console.log(id, "ID");
        fetch(`${srcUrl}/Schedules/${newDate}/${id}?all=${!all}`, {
            method: 'patch',
            headers: {
                //'Content-Type': 'multipart/form-data'
            },
            credentials: "include",
            body: formData
        });

    }

    return (<Popup trigger={<p className="lessonOption">Изменить</p>} modal className={'deleting'}>
        {close => (
            <>
            <form name={formName}>
            <div className="modal" id="deletingModal">
                <a className="close" onClick={close}>
                    &times;
                </a>
                <div className="header" id="deletingHeader">Изменить запись</div>

                <div className="content" id="changingContent">
                    <div id="timeContentPart">
                        <span className="text" id="changingHeader">Время</span>

                            <div id="timePeriod">
                                <input name={"StartTime"} className="timeInput" id="timeStart" placeholder="XX:XX"/>
                                <span className="textBetween">—</span>
                                <input name={"EndTime"} className="timeInput" id="timeEnd" placeholder="XX:XX"/>
                            </div>

                    </div>
                    <span className="modalScheduleHeader">Название</span>
                    <input name={"Title"} type="text" className="scheduleInput"/>
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
                    <span className="modalScheduleHeader">Применить для</span>
                    <p className="scheduleRadio"><input name="deleteRepeating" type="radio" value="false" defaultChecked/>Текущей записи</p>
                    <p className="scheduleRadio"><input name="deleteRepeating" type="radio" value="true"/>Всех повторяющихся записей</p>
                </div>
                <div className="modalFooter" id="changingFooter">
                    <button className="sendingButton" onClick={onSubmit}>Изменить</button>
                </div>
            </div>
            </form>
            </>
        )}
    </Popup>);
}

export default lessonChanging