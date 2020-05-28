import React from "react";

function isValidPassword(value: string): boolean {
    return value.length > 5;
}

export default isValidPassword