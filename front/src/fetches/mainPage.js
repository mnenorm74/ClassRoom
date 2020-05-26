import {srcUrl} from "../mySettings";
import ScheduleDay from "../components/Schedule/scheduleDay";
import React from "react";
import {getUser} from "../fetches/users";
import {getComments} from "../fetches/news";
import NewsItem from "../components/News/newsItem";
import {formatDateNews} from "./news";
import {formatDayWeek} from "./schedule";



/*export function getNews () {
    console.log("fetchNews");
    let page = 1;
    return fetch(`${srcUrl}/News?page=${page}&count=${14}`)
}*/

export function addDaysTag(source) {
    let days = [];
    for (let i = 0; i < source.length; i++) {
        console.log(source[i], "XMMMMMM");
        days.push(<ScheduleDay day={formatDate(source[i].dayDate)} lessons={source[i].lessons} />);
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



function formatDate(date) {
    let newDate = new Date(date);
    let dayWeek = formatDayWeek(newDate);
    let month = newDate.getMonth() + 1;
    return `${dayWeek} ${newDate.getDate()}.${month < 10 ? '0'+ month : month}`
}