import {srcUrl} from "../mySettings";
import NewsItem from "../components/News/newsItem";
import React from "react";
import {formatDateNews} from "./news";
import GroupUser from "../components/group/groupUser";

export function getUser (id) {
    console.log("fetchUser");
    return fetch(`${srcUrl}/Users/${id}`);
}

export function getGroup() {
    console.log("fetchGroup");
    return fetch(`${srcUrl}/Users`, {
        credentials: "include"
    });
}

export function addUsersTag(source) {
    let tags = [];
    //console.log(source, "123USERS")
    for(let i = 0; i < source.length; i++) {
        tags.push(<GroupUser name={`${source[i].surname} ${source[i].name} ${source[i].patronymic}`} email={source[i].email}/>)
    }
    return tags;
}