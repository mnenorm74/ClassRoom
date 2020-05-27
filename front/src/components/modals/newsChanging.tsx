import React from "react";
import Popup from "reactjs-popup";
import '../News/news.css'
import isEmptyField from "../../validation/isEmptyField";
import warnEmptiness from "../../validation/warnEmptiness";

const formName = "newsChanging";

function isValidForm(): boolean {
    return !isEmptyField(formName, "changingNewsHeader") && !isEmptyField(formName, "changingNewsContent");
}

function newsChanging() {
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
                  }}
                  onSubmit={() => {
                      //TODO Отправка формы
                      if (isValidForm()) {
                          alert("отправляю")
                      } else {
                          alert("не отправляю")
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
                    <input name="addingNewsHeader" type="text" id="changingNewsHeader" onChange={() => {
                        warnEmptiness(formName, "changingNewsHeader", "newsChangingHeaderValidation")
                    }}/>
                    <div className='modalFieldHeader'>
                        <span className="modalContentHeader">Содержание</span>
                        <span className="modalContentStatus" id="newsChangingContentValidation">Содержание не может быть пустым</span>
                    </div>
                    <textarea id="addingNewsContent" name={"changingNewsContent"} onChange={() => {
                        warnEmptiness(formName, "changingNewsContent", "newsChangingContentValidation")
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

export default newsChanging()