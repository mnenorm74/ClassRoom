import React from "react";
import LessonFull from "./lessonFull";
import './scheduleDayFull.css'
import {formatDayWeek, formatDaySignature} from "../../fetches/schedule";

function ScheduleDayFull({day, lessons}: { day: string, lessons: any[] }) {

    function showLessons() {
        let tags = lessons.map(lesson => <LessonFull lesson={lesson} day={day}/>);
        if (tags.length === 0) {
            return <p className={'weekendDay'}>В данный день пар нет!</p>
        } else {
            return tags;
        }
    }

    return (<div id={'ScheduleDayFullContainer'}>
        <p id={'day'}>{formatDayWeek(day) + ', ' + formatDaySignature(day)}</p>
        {showLessons()}
    </div>)
}

export default ScheduleDayFull