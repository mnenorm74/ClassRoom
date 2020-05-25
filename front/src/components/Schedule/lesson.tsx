import React from 'react';
import {LessonType} from "./lessonStuff";
import './lesson.css'

function Lesson({order, name, type}:{order:string, name:string, type:string}) {
    let style = 'lessonOrder ';
    switch (type) {
        case 'lecture':
            style+='lecture';
            break;
        case 'practice':
            style+='practice';
            break;
        case 'lab':
            style+='lab';
            break;
        // case LessonType.Seminar:
        //     style+='seminar'
        //     break
    }
    return (
        <div className='lesson'>
            <i className={style}>{order}</i>
            <span>{name}</span>
        </div>
    )
}

export default Lesson