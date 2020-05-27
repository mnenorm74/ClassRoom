import React from "react";
import Popup from "reactjs-popup";
import warnEmptiness from "../../validation/warnEmptiness";
import isEmptyField from "../../validation/isEmptyField";
import {formatDateForm} from "../../fetches/schedule";
import {srcUrl} from "../../mySettings";


const formName = "newsAdding";

function isValidForm(): boolean {
    return !isEmptyField(formName, "addingNewsHeader") && !isEmptyField(formName, "addingNewsContent");
}

function newsAdding() {
    /*onSubmit={() => {
        //TODO Отправка формы
        if (isValidForm()) {
            alert("отправляю")
        } else {
            //alert("не отправляю")
        }
    }}*/

    function onSubmit() {
        if (!isValidForm()) {
            return;
        }
        let form: any = document.forms.namedItem(formName);
        let formData = new FormData(form);
        console.log(formData.get("Title"), "Title");
        fetch(`${srcUrl}/News`, {
            method: 'post',
            credentials: "include",
            body: formData
        });
    }

    return (
        <Popup trigger={<button id="newsAdding"/>} modal>
            {close => (
                <>
                    <form name={formName} className="modal"
                          onChange={() => {
                              //@ts-ignore
                              document.getElementById("newsAddingButton").disabled = !isValidForm();
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
                            <input name="Title" type="text" id="addingNewsHeader" onChange={() => {
                                warnEmptiness(formName, "Title", "newsAddingHeaderValidation")
                            }}/>
                            <div className='modalFieldHeader'>
                                <span className="modalContentHeader">Содержание</span>
                                <span className="modalContentStatus" id="newsAddingContentValidation">Содержание не может быть пустым</span>
                            </div>
                            <textarea name="Content" id="addingNewsContent" onChange={() => {
                                warnEmptiness(formName, "Content", "newsAddingContentValidation")
                            }}/>
                        </div>
                       {/* <input name="Title" type="text" id="addingNewsHeader" onChange={() => {
                            warnEmptiness(formName, "Title", "newsAddingHeaderValidation")
                        }}/>
                        <div className='modalFieldHeader'>
                            <span className="modalContentHeader">Содержание</span>
                            <span className="modalContentStatus" id="newsAddingContentValidation">Содержание не может быть пустым</span>
                        </div>
                        <textarea name="Content" id="addingNewsContent" onChange={() => {
                            warnEmptiness(formName, "Content", "newsAddingContentValidation")
                        }}/>
                    </div>

                    </form>*/}
                    <div className="modalFooter">
                        <button className="sendingButton" onClick={onSubmit} id="newsAddingButton">Добавить
                        </button>
                    </div>
                </form>
                </>
            )}
        </Popup>
    )
}

export default newsAdding()