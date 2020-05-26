import {srcUrl} from "../mySettings";
import ScheduleDay from "../components/Schedule/scheduleDay";
import React from "react";
import {getUser} from "../fetches/users";
import {getComments} from "../fetches/news";
import NewsItem from "../components/News/newsItem";
import {formatDateNews} from "./news";

export function getSchedules () {
    console.log("fetchSchedules");
    let date = getStartDate();
    return fetch(`${srcUrl}/Schedules?startDate=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}&count=${14}`);
}

export function getNews () {
    console.log("fetchNews");
    let page = 1;
    return fetch(`${srcUrl}/News?page=${page}&count=${14}`)
}

export function addDaysTag(source) {
    let days = [];
    for (let i = 0; i < source.length; i++) {
        days.push(<ScheduleDay day={formatDate(source[i].date)} /*lessons={source[i].lessons}*/ />);
    }
    return days;
}

export function addNewsTag(source, author, comments) {
    let res = [];
    for (let i = 0; i < source.length; i++) {
      /*  getUser(source[i].authorId)
            .then(author => author.json())
            .then( (author) => {
                getComments(source[i].id).then(comments => comments.json()).then(comments => {
                    res.push(<NewsItem author={author.name + ' ' + author.surname} pubDate={formatDateNews(source[i].date)} article={source[i].content}
                                       comments={comments}/>);
                    console.log(author, comments, "AAAAA")
                })
            })*/
            /*.then(pair =>
            {
                console.log(pair, "AAAAA1")
                return [pair[0], pair[1].json()];
            })
            .then((result) =>
                { res.push(<NewsItem author={result[0].name + ' ' + result[0].surname} pubDate={formatDateNews(source[i].date)} article={source[i].content}
                                                       comments={result[1]}/>);
                    console.log(result, "AAAAA")
                });*/

        /*let author = {};
        getUser(source[i].authorId).then(res => res.json()).then(result => author = JSON.parse(JSON.stringify(result)));
        let comments = [];
        getComments(source[i].id).then(res => res.json()).then(result => comments = JSON.parse(JSON.stringify(result)));
        //let author = responseAuthor(source[i]);
        //let comments = responseComments(source[i]);*/
        //setTimeout(() => console.log(comments, author, "AAAAA"), 5000);
        res.push(<NewsItem author={author.name + ' ' + author.surname} pubDate={formatDateNews(source[i].date)} article={source[i].content}
                           comments={comments}/>);
    }
    //console.log(res, "RES");
    return res;
}

async function responseAuthor(news) {
    let promise = await getUser(news.authorId);
    let author = await promise.json();
    console.log(author, "AUTHOR");
    return author;
}

async function responseComments(news) {
    let promise = await getComments(news.id);
    let comments = await promise.json();
    console.log(comments);
    return comments;
}

function getStartDate() {
    let date = new Date();
    if(date.getDay() !== 1) {
        date.setDate(date.getDate() - (6 - date.getDay()))
    }
    return date;
}



function formatDate(date) {
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
    let month = newDate.getMonth() + 1;
    return `${dayWeek} ${newDate.getDate()}.${month < 10 ? '0'+ month : month}`
}