import React from "react";
import isEmail from "./isEmail";

function warnEmail(formName: string, fieldName: string, validationMessageId: string) {
    // @ts-ignore
    let value = document.forms[formName][fieldName].value;
    if (!isEmail(value)) {
        document.getElementById(validationMessageId)!.style.visibility = "visible";
    } else {
        document.getElementById(validationMessageId)!.style.visibility = "hidden";
    }
}

// @ts-ignore
export default warnEmail