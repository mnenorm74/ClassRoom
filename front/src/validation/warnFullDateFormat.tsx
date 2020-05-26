import React from "react";

function warnFullDateFormat(formName: string, fieldName: string, validationMessageId: string) {
    // @ts-ignore
    let value = document.forms[formName][fieldName].value;
    if (!isValidDate(value)) {
        document.getElementById(validationMessageId)!.style.display = "block";
    } else {
        document.getElementById(validationMessageId)!.style.display = "none";
    }
}

function isValidDate(date: string): boolean {
    if(date.length !== 10)
        return false;
    return true;
}

// @ts-ignore
export default warnFullDateFormat