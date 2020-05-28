import React from "react";
import Popup from "reactjs-popup";
import {srcUrl} from "../../mySettings";

const formName = "commentDeleting";

function commentDeleting(id : any, CommId : any){
    function onSubmit() {
        fetch(`${srcUrl}/${id}/comments/${CommId}`, {
            method: 'delete',
            credentials: "include"
        });

    }
    return (<Popup trigger={<p className="lessonOption">Удалить</p>} modal className={'deleting'}>
        {close => (
            <form name={formName}>
                <div className="modal" id="deletingModal">
                    <a className="close" onClick={close}>
                        &times;
                    </a>
                    <div className="header" id="deletingHeader">Удалить комментарий</div>
                    <p id="deletingMessage">Вы уверены, что хотите удалить комментарий?</p>
                    <div className="modalFooter" id="deletingFooter">
                        <button className="sendingButton" id="positiveAnswer">Да</button>
                        <button className="sendingButton" id="negativeAnswer" onClick={close}>Нет</button>
                    </div>
                </div>
            </form>
        )}
    </Popup>);
}

export default commentDeleting