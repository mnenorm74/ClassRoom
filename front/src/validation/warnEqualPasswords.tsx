import React from "react";
import isEmail from "./isEmail";

function warnEqualPasswords(formName: string, firstFieldName: string, secondFieldName: string, validationMessageId: string) {
    // @ts-ignore
    let firstValue = document.forms[formName][firstFieldName].value;
    // @ts-ignore
    let secondValue = document.forms[formName][secondFieldName].value;
    if (firstValue !== secondValue) {
        document.getElementById(validationMessageId)!.style.visibility = "visible";
    } else {
        document.getElementById(validationMessageId)!.style.visibility = "hidden";
    }
}

export default warnEqualPasswords