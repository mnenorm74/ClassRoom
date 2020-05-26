import {srcUrl} from "../mySettings";
import {addDaysTag} from "./mainPage";
import ScheduleDay from "../components/Schedule/scheduleDay";
import React from "react";
import ScheduleDayFull from "../components/ScheduleFull/scheduleDayFull";
import Lesson from "../components/Schedule/lesson";

export function getSchedules (count) {
    console.log("fetchSchedulesMain");
    let date = getStartDate();
    return fetch(`${srcUrl}/Schedules?startDate=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}&count=${count}`);
}


export function addFullDaysTag(source) {
    let days = [];
    for (let i = 0; i < source.length; i++) {
        days.push(<ScheduleDayFull day={formatDayWeek(source[i].dayDate)} /*lessons={source[i].lessons}*/ />);
    }
    return days;
}

export function addLessonTag(lessons) {
    let result = [];
    let copyLessons = lessons;
    console.log(lessons, "!!!!!");
    /*if(lessons.length === 0) {
        return (<p>В данный день пар нет!</p>)
    }*/
    //copyLessons.sort(compare);
    for(let i = 0; i < lessons.length; i++) {
        result.push(<Lesson order={determineLessonNumber(copyLessons[i].startTime)} name={copyLessons[i].title} type={copyLessons[i].type}/>)
    }
    return result;
}

function determineLessonNumber(startTime) {
    let time = startTime.split(':').map((e) => +e);
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
}

function getStartDate() {
    let date = new Date();
    if(date.getDay() !== 1) {
        date.setDate(date.getDate() - (date.getDay() - 1))
    }
    return date;
}

export function getCurrentDate() {
    let date = new Date();
    return formatDateSchedule(date);
}

function formatDateSchedule(date) {
    let newDate = new Date(date);
    return `${formatDayWeek(newDate)}, ${newDate.getDate()} ${formatMonth(newDate)} ${newDate.getFullYear()}`;
}

export function formatDayWeek(date) {
    let newDate = new Date(date);
    let dayWeek = '';
    switch (newDate.getDay()) {
        case 0 :
            dayWeek = 'ВС';
            break;
        case 1 :
            dayWeek = 'ПН';
            break;
        case 2 :
            dayWeek = 'ВТ';
            break;
        case 3 :
            dayWeek = 'СР';
            break;
        case 4 :
            dayWeek = 'ЧТ';
            break;
        case 5 :
            dayWeek = 'ПТ';
            break;
        case 6 :
            dayWeek = 'СБ';
            break;
    }
    return dayWeek;
}

function formatMonth(date) {
    let month = '';
    switch (date.getMonth()) {
        case 0 :
            month = 'января';
            break;
        case 1 :
            month = 'февраля';
            break;
        case 2 :
            month = 'марта';
            break;
        case 3 :
            month = 'апреля';
            break;
        case 4 :
            month = 'мая';
            break;
        case 5 :
            month = 'июня';
            break;
        case 6 :
            month = 'июля';
            break;
        case 7 :
            month = 'августа';
            break;
        case 8 :
            month = 'сентября';
            break;
        case 9 :
            month = 'октября';
            break;
        case 10 :
            month = 'ноября';
            break;
        case 11 :
            month = 'декабря';
            break;
    }
    return month;
}