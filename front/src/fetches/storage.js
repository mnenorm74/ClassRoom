import {srcUrl} from "../mySettings";

export function getLastFiles() {
    console.log("fetchLastFiles");
    return fetch(`${srcUrl}/Storage/last`);
}