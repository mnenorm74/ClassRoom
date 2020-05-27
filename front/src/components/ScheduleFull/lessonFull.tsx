import React from "react";
import {LessonList, LessonType} from '../Schedule/lessonStuff'
import './lessonFull.css'
import {formatType} from "../../fetches/schedule";
import lessonOptions from "../modals/lessonOptions";

function LessonFull({lesson, id, day} : {lesson : any, id : any, day: any}) {
    return (<div id={'fullDayContainer'}>
        <div className={'time'}>
            <p>{lesson.startTime}</p>
            <p id ={"separ"}>-</p>
            <p>{lesson.endTime}</p>
        </div>
        <div className={'fullLessonContainer'}>
            <p className={'lessonFullInfo'}>{lesson.title}</p>
            <p className={'lessonFullInfo'}>{formatType(lesson.type)}</p>
            <p className={'lessonFullInfo'}>{lesson.audience}</p>
            <p className={'lessonFullInfo'}>Преподаватель: {lesson.teacher}</p>
        </div>
        {lessonOptions(id, day)}
    </div>)
}

export default LessonFull