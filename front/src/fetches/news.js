import {srcUrl} from "../mySettings";

export function getComments(id) {
    console.log("fetchComments");
    return fetch(`${srcUrl}/News/${id}/comments`);
}

export function formatDateNews(date) {
    let newDate = new Date(date);
    let month = newDate.getMonth() + 1;
    return `${newDate.getDate()}.${month < 10 ? '0' + month : month}.${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`
}