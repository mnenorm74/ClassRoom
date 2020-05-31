import {srcUrl} from "../mySettings";
import NewsItem from "../components/News/newsItem";
import React from "react";
import Comment from "../components/News/comment";

export function getNews () {
    console.log("fetchNews");
    let page = 1;
    return fetch(`${srcUrl}/News?page=${page}&count=${20}`, {
        credentials: "include"
    })
}

export function addNewsTag(source) {
    let tags = [];
    for(let i = 0; i < source.length; i++) {
        tags.push(<NewsItem author={source[i].authorName + ' ' + source[i].authorSurname}
                            pubDate={formatDateNews(source[i].date)}
                            article={source[i].content}
                            /*comments={source[i].comments}*/
                            id = {source[i].id}
                            title={source[i].title}
                            key={i} />);
    }
    return tags;
}

export function getComments(id) {
    console.log("fetchComments");
    return fetch(`${srcUrl}/News/${id}/comments`);
}

export function addComments(source, id) {
    let tags = [];
    for(let i = 0; i < source.length; i++) {
        tags.push(Comment(source[i], id));
    }
    return tags;
}

export function formatDateNews(date) {
    let newDate = new Date(date);
    let month = newDate.getMonth() + 1;
    let minutes = newDate.getMinutes();
    return `${newDate.getDate()}.${month < 10 ? '0' + month : month}.${newDate.getFullYear()} ${newDate.getHours()}:${minutes < 10 ? '0' + minutes : minutes}`
}