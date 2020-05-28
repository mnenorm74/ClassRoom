import React from "react";
import isValidPassword from "./isValidPassword";

function warnPassword(formName: string, fieldName: string, validationMessageId: string) {
    // @ts-ignore
    let value = document.forms[formName][fieldName].value;
    if (!isValidPassword(value)) {
        document.getElementById(validationMessageId)!.style.visibility = "visible";
    } else {
        document.getElementById(validationMessageId)!.style.visibility = "hidden";
    }
}

export default warnPassword