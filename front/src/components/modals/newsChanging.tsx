import React from "react";
import Popup from "reactjs-popup";
import '../News/news.css'

function newsChanging() {
    return (<Popup trigger={<p className="lessonOption">Изменить</p>} modal className={'deleting'}>
        {close => (
            <div className="modal">
                <a className="close" onClick={close}>
                    &times;
                </a>
                <div className="header" id="deletingHeader">Изменить новость</div>
                <div className="content">
                    <span className="modalContentHeader">Заголовок</span>
                    <input type="text" id="addingNewsHeader"/>
                    <span className="modalContentHeader">Содержание</span>
                    <textarea id="addingNewsContent"/>
                </div>
                <div className="modalFooter" id="changingFooter">
                    <button className="sendingButton">Изменить</button>
                </div>
            </div>
        )}
    </Popup>);
}

export default newsChanging()