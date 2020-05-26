import React from "react";
import LessonFull from "./lessonFull";
import './scheduleDayFull.css'

function ScheduleDayFull({day, lessons}: { day: string, lessons : any[] }) {

    function showLessons() {
        let tags = lessons.map(lesson => <LessonFull lesson={lesson}/>);
        if(tags.length == 0) {
            return <p>В данный день пар нет!</p>
        } else {
            return tags;
        }
    }

    return (<div id={'ScheduleDayFullContainer'}>
        <p id={'day'}>{day}</p>
        {/*<LessonFull/>
        <LessonFull/>
        <LessonFull/>
        <LessonFull/>*/}
        {showLessons()}
    </div>)
}

export default ScheduleDayFull