import React from "react";
import Popup from "reactjs-popup";
import lessonDeleting from "./lessonDeleting";

const Card = () => (
    <div className="card">
        <div className="content">
            <p className="lessonOption">Изменить</p>
            {lessonDeleting}
        </div>
    </div>
);

function lessonOptions() {
    return(
        <Popup
            trigger={ <button className={'lessonOptions'}/> }
            position="right top"
            on="hover" className={'options'}>
            <Card/>
        </Popup>
    )
}

export default lessonOptions()