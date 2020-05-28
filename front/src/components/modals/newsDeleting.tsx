import React from "react";
import Popup from "reactjs-popup";
import '../News/news.css'
import {srcUrl} from "../../mySettings";

function newsDeleting(id: any) {

    function onSubmit() {
        console.log(id, "NewsId");
        fetch(`${srcUrl}/News/${id}`, {
            method: 'delete',
            credentials: "include"
        });

    }

    return (<Popup trigger={<p className="lessonOptionItem">Удалить</p>} modal className={'deleting'}>
        {close => (
            <>
            <form>
                <div className="modal" id="deletingModal">
                    <a className="close" onClick={close}>
                        &times;
                    </a>
                    <div className="header" id="deletingHeader">Удалить новость</div>
                    <div id="deletingOptions">
                        <span id="deletingText">Вы уверены, что хотите удалить новость?</span>
                    </div>
                    <div className="modalFooter">
                        <button className="sendingButton" onClick={onSubmit}>Удалить</button>
                    </div>
                </div>
            </form>

            </>
        )}
    </Popup>);

}

export default newsDeleting