import React from "react";
import isValidTime from "./isValidTime";

function warnTimeFormat(formName: string, firstField: string, secondField: string, validationMessageId: string) {
    // @ts-ignore
    let startTime = document.forms[formName][firstField].value;
    // @ts-ignore
    let endTime = document.forms[formName][secondField].value;
    let isValidPeriod = isValidTime(startTime) && isValidTime(endTime);
    if (!isValidPeriod) {
        document.getElementById(validationMessageId)!.style.display = "block";
    } else {
        document.getElementById(validationMessageId)!.style.display = "none";
    }
}

export default warnTimeFormat