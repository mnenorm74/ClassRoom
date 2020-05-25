import React from "react";
import {LessonList, LessonType} from '../Schedule/lessonStuff'
import './lessonFull.css'
import Popup from "reactjs-popup";

const Card = () => (
    <div className="card">
        <div className="content">
            <p className="lessonOption">Изменить</p>
            <p className="lessonOption">Удалить</p>
        </div>
    </div>
);

function LessonFull() {
    return (<div id={'fullDayContainer'}>
        <div id={'time'}>12:00-13:30</div>
        <div className={'fullLessonContainer'}>
            <p className={'lessonFullInfo'}>{LessonList.Network}</p>
            <p className={'lessonFullInfo'}>{LessonType.Lecture}</p>
            <p className={'lessonFullInfo'}>Р247 Мира,32</p>
            <p className={'lessonFullInfo'}>Преподаватель: Филимонов А.Ю.</p>
        </div>
        <Popup
            trigger={ <button className={'lessonOptions'}/> }
            position="right top"
            on="hover">
            <Card/>
        </Popup>
    </div>)
}

export default LessonFull