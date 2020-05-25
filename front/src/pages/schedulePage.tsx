import React from "react";
import ScheduleDayFull from "../components/ScheduleFull/scheduleDayFull";
import '../components/ScheduleFull/scheduleFull.css'
import Popup from "reactjs-popup";


function SchedulePage() {
    return (
        <>
            <div id="schedulePageHeader">
                <Popup trigger={<button id="newsAdding"></button>} modal>
                    {close => (
                        <div className="modal">
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
                                        <input className="text" id="dateInput" placeholder="XX:XX:XXXX"/>
                                        <div id="timePeriod">
                                            <input className="timeInput" id="timeStart" placeholder="XX:XX"/>
                                            <span className="textBetween">—</span>
                                            <input className="timeInput" id="timeEnd" placeholder="XX:XX"/>
                                        </div>
                                    </div>
                                </div>
                                <span className="modalScheduleHeader">Заголовок</span>
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
                        </div>
                    )}
                </Popup>
            </div>
            <p className={'title'}>СР, 8 апреля 2020</p>
            <div id={'scheduleComponentContainer'}>
                <button className={'arrowButton'}/>
                <div id={'scheduleContainer'}>
                    <ScheduleDayFull day={'Пн'}/>
                    <ScheduleDayFull day={'Пн'}/>
                    <ScheduleDayFull day={'Пн'}/>
                    <ScheduleDayFull day={'Пн'}/>
                </div>
                <button className={'arrowButton right'}/>
            </div>
        </>
    )
}

export default SchedulePage