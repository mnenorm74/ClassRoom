import {srcUrl} from "../mySettings";

export function getComments (id) {
    console.log("fetchComments");
    return fetch(`${srcUrl}/News/${id}/comments`);
}

export function formatDateNews(date) {
    let newDate = new Date(date);
    return `${newDate.getDate()}.${newDate.getMonth()+1}.${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`
}