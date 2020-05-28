import React from "react";
import Popup from "reactjs-popup";
import '../News/news.css'
import isEmptyField from "../../validation/isEmptyField";
import warnEmptiness from "../../validation/warnEmptiness";
import {srcUrl} from "../../mySettings";

const formName = "newsChanging";

function isValidForm(): boolean {
    return !isEmptyField(formName, "changingNewsHeader") && !isEmptyField(formName, "Content");
}

function newsChanging(id : any) {
    function onSubmit() {
        if (!isValidForm()) {
            // @ts-ignore
            document.querySelector('.sendingButton').setAttribute("disabled", "true");
            return;
        }
        let form: any = document.forms.namedItem(formName);
        let formData = new FormData(form);
        //console.log(formData.get("Title"), "Title");
        fetch(`${srcUrl}/News/${id}`, {
            method: 'patch',
            credentials: "include",
            body: formData
        });

        return (<Popup trigger={<p className="lessonOption">Изменить</p>} modal className={'deleting'}>
            {close => (
                <form name={formName} className="modal"
                      onChange={() => {
                          if (!isValidForm()) {
                              // @ts-ignore
                              document.querySelector('.sendingButton').setAttribute("disabled", "true")
                          } else {
                              // @ts-ignore
                              document.querySelector('.sendingButton').removeAttribute("disabled")
                          }
                      }}>

                    <a className="close" onClick={close}>
                        &times;
                    </a>
                    <div className="header" id="deletingHeader">Изменить новость</div>
                    <div className="content">
                        <div className='modalFieldHeader'>
                            <span className="modalContentHeader">Заголовок</span>
                            <span className="modalContentStatus" id="newsChangingHeaderValidation">Заголовок не может быть пустым</span>
                        </div>
                        <input name="Title" type="text" id="changingNewsHeader" onChange={() => {
                            warnEmptiness(formName, "Title", "newsChangingHeaderValidation")
                        }}/>
                        <div className='modalFieldHeader'>
                            <span className="modalContentHeader">Содержание</span>
                            <span className="modalContentStatus" id="newsChangingContentValidation">Содержание не может быть пустым</span>
                        </div>
                        <textarea id="addingNewsContent" name={"Content"} onChange={() => {
                            warnEmptiness(formName, "Content", "newsChangingContentValidation")
                        }}/>
                    </div>
                    <div className="modalFooter" id="changingFooter">
                        <button type="submit" className="sendingButton" id="newsChangingButton"
                                onClick={onSubmit}>Изменить
                        </button>
                    </div>
                </form>
            )}
        </Popup>);
    }
}

export default newsChanging