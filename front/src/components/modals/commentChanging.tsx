import React from "react";
import isEmptyField from "../../validation/isEmptyField";
import Popup from "reactjs-popup";
import warnEmptiness from "../../validation/warnEmptiness";
import {srcUrl} from "../../mySettings";

const formName = "commentChanging";

function isValidForm(): boolean {
    return !isEmptyField(formName, "changingCommentContent");
}

function commentChanging(id : any, commId : any){
    function onSubmit() {
        if (!isValidForm()) {
            // @ts-ignore
            document.querySelector('.sendingButton').setAttribute("disabled", "true")
            return;
        }
        let content : any = document.querySelector("#addingNewsContent");
        let res : any = JSON.stringify({"Content" : content.value});
        fetch(`${srcUrl}/News/${id}/comments/${commId}`, {
            method: 'put',
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
            },
            body: res,
        })
    }

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
                <div className="header" id="deletingHeader">Изменить комментарий</div>
                <div className="content">
                    <div className='modalFieldHeader'>
                        <span className="modalContentHeader">Содержание</span>
                        <span className="modalContentStatus" id="ChangingCommentValidation">Содержание не может быть пустым</span>
                    </div>
                    <textarea id="addingNewsContent" name={"changingCommentContent"} onChange={() => {
                        warnEmptiness(formName, "changingCommentContent", "ChangingCommentValidation")
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

export default commentChanging