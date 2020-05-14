import React from 'react';
import Lesson from "./lesson";
import {LessonList, LessonType} from "./lessonStuff";
import './scheduleDay.css'


function ScheduleDay({day}:{day:string}) {
    return (
        <div id='dayContainer'>
            <p>{day}</p>
            <Lesson order='1' name={LessonList.Network} type={LessonType.Lecture}/>
            <Lesson order='2' name={LessonList.Network} type={LessonType.Lab}/>
            <Lesson order='3' name={LessonList.Modeling} type={LessonType.Practice}/>
            <Lesson order='4' name={LessonList.SystemPO} type={LessonType.Seminar}/>
        </div>
    )
}

export default ScheduleDay