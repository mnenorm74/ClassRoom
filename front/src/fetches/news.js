import {srcUrl} from "../mySettings";
import NewsItem from "../components/News/newsItem";
import React from "react";

export function getNews () {
    console.log("fetchNews");
    let page = 1;
    return fetch(`${srcUrl}/News?page=${page}&count=${20}`)
}

export function addNewsTag(source) {
    let tags = [];
    for(let i = 0; i < source.length; i++) {
        tags.push(<NewsItem author={source[i].authorName + ' ' + source[i].authorSurname}
                            pubDate={formatDateNews(source[i].date)}
                            article={source[i].content}
                            comments={source[i].comments}
                            id = {source[i].id}
                            key={i} />);
    }
    return tags;
}

export function getComments(id) {
    console.log("fetchComments");
    return fetch(`${srcUrl}/News/${id}/comments`);
}

export function formatDateNews(date) {
    let newDate = new Date(date);
    let month = newDate.getMonth() + 1;
    return `${newDate.getDate()}.${month < 10 ? '0' + month : month}.${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`
}