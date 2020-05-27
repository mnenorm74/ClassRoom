import React from "react";

function isValidTime(time: string): boolean {
    if (time.length !== 5)
        return false;
    let parts = time.split(":");
    if (parts.length !== 2)
        return false;
    let firstPart = parseInt(parts[0]);
    let secondPart = parseInt(parts[1]);
    return firstPart > 0 && firstPart < 24 && secondPart > -1 && secondPart < 60;
}

export default isValidTime