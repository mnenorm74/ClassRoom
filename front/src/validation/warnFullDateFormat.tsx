import React from "react";
import isValidFullDate from "./isValidFullDate";

function warnFullDateFormat(formName: string, fieldName: string, validationMessageId: string) {
    // @ts-ignore
    let value = document.forms[formName][fieldName].value;
    if (!isValidFullDate(value)) {
        document.getElementById(validationMessageId)!.style.display = "block";
    } else {
        document.getElementById(validationMessageId)!.style.display = "none";
    }
}

// @ts-ignore
export default warnFullDateFormat