import {srcUrl} from "../mySettings";

export function getLastFiles(count) {
    console.log("fetchLastFiles");
    return fetch(`${srcUrl}/Storage/last`, {
        credentials: "include"
    });
}