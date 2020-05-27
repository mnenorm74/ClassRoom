import React, {useState} from 'react';
import Lesson from "./lesson";
import {LessonList, LessonType} from "./lessonStuff";
import './scheduleDay.css'
import {addLessonTag} from "../../fetches/schedule";


function ScheduleDay({day, lessons}:{day:string, lessons : any[]}) {
    /*const [isLoadedLessons, setIsLoadedLessons] = useState(false);
    const [Lessons, setLessons]: [any, any] = useState([]);*/
    /*function addLessonTag() {
        let result = [];
        let copyLessons = lessons;
        if(lessons.length === 0) {
            return <p>В данный день пар нет!</p>
        }
        copyLessons.sort(compare);
        for(let i = 0; i < lessons.length; i++) {
            result.push(<Lesson order={determineLessonNumber(copyLessons[i].startTime)} name={copyLessons[i].title} type={copyLessons[i].type}/>)
        }
        return result;
    }*/
    /*function compare(a : any, b : any) {
        let timeA = a.startTime.split(':').map((e : string) => +e);
        let timeB = b.startTime.split(':').map((e : string) => +e);
        if (timeA[0] > timeB[0]) return 1;
        if (timeA[0] === timeB[0]) {
            if (timeA[1] > timeB[1]) return 1;
            if(timeA[1] === timeB[1]) return 0;
            if (timeA[1] < timeB[1]) return -1;
        }
        if (timeA[0] < timeB[0]) return -1;
        return 0;
    }*/
    /*function determineLessonNumber(startTime : string) {
        let time = startTime.split(':').map((e : string) => +e);
        if(time[0] < 9) {
            return '1';
        }
        if(time[0] >= 9 && time[0] < 12){
            return  '2';
        }
        if(time[0] >= 12 && time[0] < 14) {
            return '3';
        }
        if(time[0] >= 14 && time[0] < 16) {
            return '4';
        }
        if(time[0] >= 16 && time[0] < 17) {
            return '5';
        }
        if(time[0] >= 17 && time[0] < 19) {
            return '6';
        }
        if(time[0] >= 19 && time[0] < 21) {
            return '7';
        }
        return '-1';
    }*/

    function showLessons() {
        let tags : any = addLessonTag(lessons);
        if(tags.length === 0) {
            return <p>В данный день пар нет!</p>
        } else {
            return tags;
        }
    }
    return (
        <div id='dayContainer'>
            <p>{day}</p>
            {/*<Lesson order='1' name={LessonList.Network} type={LessonType.Lecture}/>
            <Lesson order='2' name={LessonList.Network} type={LessonType.Lab}/>
            <Lesson order='3' name={LessonList.Modeling} type={LessonType.Practice}/>
            <Lesson order='4' name={LessonList.SystemPO} type={LessonType.Seminar}/>
*/}
            {showLessons()}
        </div>
    )
}

export default ScheduleDay