import React from "react";
import Popup from "reactjs-popup";

function newsAdding() {
    return(
        <Popup trigger={<button id="newsAdding"></button>} modal>
            {close => (
                <div className="modal">
                    <a className="close" onClick={close}>
                        &times;
                    </a>
                    <div className="header">ДОБАВИТЬ НОВОСТЬ</div>
                    <div className="content">
                        <span className="modalContentHeader">Заголовок</span>
                        <input type="text" id="addingNewsHeader"></input>
                        <span className="modalContentHeader">Содержание</span>
                        <textarea id="addingNewsContent"></textarea>
                    </div>
                    <div className="modalFooter">
                        <button className="sendingButton">Добавить</button>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default newsAdding()