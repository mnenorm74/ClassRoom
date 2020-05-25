import {srcUrl} from "../mySettings";

export function getUser (id) {
    console.log("fetchUser");
    return fetch(`${srcUrl}/Users/${id}`);
}