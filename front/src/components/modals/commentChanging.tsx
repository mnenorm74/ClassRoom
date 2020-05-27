import React from "react";
import isEmptyField from "../../validation/isEmptyField";
import Popup from "reactjs-popup";
import warnEmptiness from "../../validation/warnEmptiness";

const formName = "commentChanging";

function isValidForm(): boolean {
    return !isEmptyField(formName, "changingCommentContent");
}

function commentChanging(){
    function onSubmit() {
        if (!isValidForm()) {
            // @ts-ignore
            document.querySelector('.sendingButton').setAttribute("disabled", "true")
            return;
        }
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

export default commentChanging()