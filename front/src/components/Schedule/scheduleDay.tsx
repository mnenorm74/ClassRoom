import React, {useState} from 'react';
import Lesson from "./lesson";
import {LessonList, LessonType} from "./lessonStuff";
import './scheduleDay.css'
import {addLessonTag} from "../../fetches/schedule";


function ScheduleDay({day, lessons}:{day:string, lessons : any[]}) {
    function showLessons() {
        let tags : any = addLessonTag(lessons);
        if(tags.length === 0) {
            return <p className={'weekendDay'}>В данный день пар нет!</p>
        } else {
            return tags;
        }
    }
    return (
        <div id='dayContainer'>
            <p>{day}</p>
            {showLessons()}
        </div>
    )
}

export default ScheduleDay