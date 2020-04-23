import React from 'react';
import Lesson from "./lesson";
import LessonList from "./lessonList";
import './scheduleDay.css'


function ScheduleDay() {
    return (
        <div id='dayContainer'>
            <p>Day</p>
            <Lesson order='1' name={LessonList.Network}/>
            <Lesson order='2' name={LessonList.Network}/>
            <Lesson order='3' name={LessonList.Modeling}/>
            <Lesson order='4' name={LessonList.SystemPO}/>
        </div>
    )
}

export default ScheduleDay