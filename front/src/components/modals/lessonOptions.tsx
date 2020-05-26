import React from "react";
import Popup from "reactjs-popup";

const Card = () => (
    <div className="card">
        <div className="content">
            <p className="lessonOption">Изменить</p>
            <p className="lessonOption">Удалить</p>
        </div>
    </div>
);

function lessonOptions() {
    return(
        <Popup
            trigger={ <button className={'lessonOptions'}/> }
            position="right top"
            on="hover">
            <Card/>
        </Popup>
    )
}

export default lessonOptions()