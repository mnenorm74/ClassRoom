import {srcUrl} from "../mySettings";
import ScheduleDay from "../components/Schedule/scheduleDay";
import React from "react";
import {getComments} from "../fetches/news";
import NewsItem from "../components/News/newsItem";
import {formatDateNews} from "./news";
import {formatDayWeek} from "./schedule";


export function addDaysTag(source) {
    let days = [];
    for (let i = 0; i < source.length; i++) {
        days.push(<ScheduleDay day={formatDate(source[i].dayDate)} lessons={source[i].lessons} />);
    }
    return days;
}

export function addNewsTag(source, author, comments) {
    let res = [];
    for (let i = 0; i < source.length; i++) {

        res.push(<NewsItem author={author.name + ' ' + author.surname} pubDate={formatDateNews(source[i].date)} article={source[i].content}
                           comments={comments}/>);
    }
    return res;
}






function formatDate(date) {
    let newDate = new Date(date);
    let dayWeek = formatDayWeek(newDate);
    let month = newDate.getMonth() + 1;
    return `${dayWeek} ${newDate.getDate()}.${month < 10 ? '0'+ month : month}`
}