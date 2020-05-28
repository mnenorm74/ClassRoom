import React from "react";
import Popup from "reactjs-popup";
import '../ScheduleFull/lessonFull.css'
import {srcUrl} from "../../mySettings";
const formName = "scheduleDeletingLesson";

function lessonDeleting(id:any, day:any) {
    function onSubmit() {
        let date = new Date(day);
        let newDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        let form: any = document.forms.namedItem(formName);
        let formData = new FormData(form);
        let all: any = formData.get("deleting");
        formData.delete("deleting");
        console.log(all, "ALL");
        fetch(`${srcUrl}/Schedules/${newDate}/${id}?all=${all === "true"}`, {
            method: 'delete',
            credentials: "include"
        });

    }


    return (<Popup trigger={<p className="lessonOptionItem">Удалить</p>} modal className={'deleting'}>
            {close => (
                <>
                <form name={formName}>
                <div className="modal" id="deletingModal">
                    <a className="close" onClick={close}>
                        &times;
                    </a>
                    <div className="header" id="deletingHeader">Удалить запись</div>
                    <div id="deletingOptions">
                        <p className="scheduleRadio"><input name="deleting" value={"false"} type="radio" defaultChecked/>Удалить текущую</p>
                        <p className="scheduleRadio"><input name="deleting" value={"true"} type="radio"/>Удалить все повторяющиеся</p>
                    </div>
                    {/*<p id="deletingMessage">Данная запись будет удалена из всех дней. Вы уверены, что хотите продлжить?</p>*/}
                    <div className="modalFooter" id="deletingFooter">
                        <button className="sendingButton" id="positiveAnswer" onClick={onSubmit}>Удалить</button>
                        {/*<button className="sendingButton" id="negativeAnswer" onClick={close}>Нет</button>*/}
                    </div>
                </div>
                </form>
                </>
            )}
        </Popup>);
}

export default lessonDeleting