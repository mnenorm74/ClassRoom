import {srcUrl} from "../mySettings";
import React from "react";
import GroupUser from "../components/group/groupUser";

export function getUser () {
    console.log("fetchUser");
    return fetch(`${srcUrl}/Users/current`, {
        credentials: "include"
    });
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
        tags.push(<GroupUser name={`${source[i].surname} ${source[i].name} ${source[i].patronymic}`} email={source[i].email} avatar={source[i].avatar}/>)
    }
    return tags;
}

export function addUserTags(source) {
    return (
        <div className="userData">
        <span>{source.name}</span>
        <span>{source.surname}</span>
        </div>)
}