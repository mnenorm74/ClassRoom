import React from "react";

function warnEmptinessHidden(formName: string, fieldName: string, validationMessageId: string) {
    // @ts-ignore
    let value = document.forms[formName][fieldName].value;
    if (value == "") {
        document.getElementById(validationMessageId)!.style.visibility = "visible";
    } else {
        document.getElementById(validationMessageId)!.style.visibility = "hidden";
    }
}

// @ts-ignore
export default warnEmptinessHidden