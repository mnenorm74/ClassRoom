import React from "react";
import Popup from "reactjs-popup";
import warnEmptiness from "../../validation/warnEmptiness";
import isEmptyField from "../../validation/isEmptyField";

const formName = "newsAdding";

function isValidForm(): boolean {
    return !isEmptyField(formName, "addingNewsHeader") && !isEmptyField(formName, "addingNewsContent");
}

function newsAdding() {
    return (
        <Popup trigger={<button id="newsAdding"></button>} modal>
            {close => (
                <form name={formName} className="modal" onSubmit={() => {
                    //TODO Отправка формы
                    if (isValidForm()) {
                        alert("отправляю")
                    } else {
                        //alert("не отправляю")
                    }
                }}>
                    <a className="close" onClick={close}>
                        &times;
                    </a>
                    <div className="header">ДОБАВИТЬ НОВОСТЬ</div>
                    <div className="content">
                        <div className='modalFieldHeader'>
                            <span className="modalContentHeader">Заголовок</span>
                            <span className="modalContentStatus" id="newsAddingHeaderValidation">Заголовок не может быть пустым</span>
                        </div>
                        <input name="addingNewsHeader" type="text" id="addingNewsHeader" onChange={() => {
                            warnEmptiness(formName, "addingNewsHeader", "newsAddingHeaderValidation")
                        }}/>
                        <div className='modalFieldHeader'>
                            <span className="modalContentHeader">Содержание</span>
                            <span className="modalContentStatus" id="newsAddingContentValidation">Содержание не может быть пустым</span>
                        </div>
                        <textarea name="addingNewsContent" id="addingNewsContent" onChange={() => {
                            warnEmptiness(formName, "addingNewsContent", "newsAddingContentValidation")
                        }}/>
                    </div>
                    <div className="modalFooter">
                        <button className="sendingButton" type="submit">Добавить</button>
                    </div>
                </form>
            )}
        </Popup>
    )
}

export default newsAdding()