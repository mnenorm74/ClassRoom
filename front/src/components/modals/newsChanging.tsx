import React from "react";
import Popup from "reactjs-popup";
import '../News/news.css'
import isEmptyField from "../../validation/isEmptyField";
import warnEmptiness from "../../validation/warnEmptiness";

const formName = "newsChanging";

function isValidForm(): boolean {
    return !isEmptyField(formName, "changingNewsHeader") && !isEmptyField(formName, "addingNewsContent");
}

function newsChanging() {
    return (<Popup trigger={<p className="lessonOptionItem">Изменить</p>} modal className={'deleting'}>
        {close => (
            <form name={formName} className="modal" onFocus={()=>
                //@ts-ignore
                console.log(document.getElementsByClassName('popup-content'))
            }
                  onChange={() => {
                    //@ts-ignore
                    document.getElementById("newsChangingButton").disabled = !isValidForm();
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
                    <textarea id="addingNewsContent" onChange={() => {
                        warnEmptiness(formName, "addingNewsContent", "newsChangingContentValidation")
                    }}/>
                </div>
                <div className="modalFooter" id="changingFooter">
                    <button type="submit" className="sendingButton" id="newsChangingButton" disabled>Изменить</button>
                </div>
            </form>
        )}
    </Popup>);
}

export default newsChanging()