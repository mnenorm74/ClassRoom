import React from "react";

function isEmptyField(formName: string, fieldName: string): boolean {
    // @ts-ignore
    return document.forms[formName][fieldName].value === "";
}

export default isEmptyField