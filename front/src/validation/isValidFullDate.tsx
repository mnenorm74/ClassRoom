import React from "react";

function isValidFullDate(date: string): boolean {
    if (date.length !== 10)
        return false;
    let parts = date.split(":");
    if (parts.length !== 3)
        return false;
    let day = parseInt(parts[0]);
    let month = parseInt(parts[1]);
    let year = parseInt(parts[2]);
    return day > 0 && day < 32 && month > 0 && month < 13 && year > 2000 && year < 3000;
}

export default isValidFullDate