import React from "react";
import {LessonList, LessonType} from '../Schedule/lessonStuff'
import './lessonFull.css'

function LessonFull() {
    return (<div id={'fullDayContainer'}>
        <div id={'time'}>12:00-13:30</div>
        <div className={'fullLessonContainer'}>
            <p className={'lessonFullInfo'}>{LessonList.Network}</p>
            <p className={'lessonFullInfo'}>{LessonType.Lecture}</p>
            <p className={'lessonFullInfo'}>Р247 Мира,32</p>
            <p className={'lessonFullInfo'}>Преподаватель: Филимонов А.Ю.</p>
        </div>
        <button className={'lessonOptions'}></button>
    </div>)
}

export default LessonFull