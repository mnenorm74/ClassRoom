import React from "react";
import Popup from "reactjs-popup";
import '../News/news.css'

function newsDeleting() {
    return (<Popup trigger={<p className="lessonOption">Удалить</p>} modal className={'deleting'}>
        {close => (
            <div className="modal" id="deletingModal">
                <a className="close" onClick={close}>
                    &times;
                </a>
                <div className="header" id="deletingHeader">Удалить новость</div>
                <div id="deletingOptions">
                    <span id="deletingText">Вы уверены, что хотите удалить новость?</span>
                </div>
                <div className="modalFooter">
                    <button className="sendingButton">Удалить</button>
                </div>
            </div>
        )}
    </Popup>);
}

export default newsDeleting()