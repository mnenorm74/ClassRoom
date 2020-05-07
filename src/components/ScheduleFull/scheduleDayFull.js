import React from "react";
import LessonFull from "./lessonFull";
import './scheduleDayFull.css'

function ScheduleDayFull({day}) {
    return (<div id={'ScheduleDayFullContainer'}>
        <p id={'day'}>{day}</p>
        <LessonFull/>
        <LessonFull/>
        <LessonFull/>
        <LessonFull/>
    </div>)
}

export default ScheduleDayFull