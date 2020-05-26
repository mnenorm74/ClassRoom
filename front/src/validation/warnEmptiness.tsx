import React from "react";

function warnEmptiness(formName: string, fieldName: string, validationMessageId: string) {
    // @ts-ignore
    let value = document.forms[formName][fieldName].value;
    if (value == "") {
        document.getElementById(validationMessageId)!.style.display = "block";
    } else {
        document.getElementById(validationMessageId)!.style.display = "none";
    }
}

// @ts-ignore
export default warnEmptiness