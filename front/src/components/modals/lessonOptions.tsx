import React from "react";
import Popup from "reactjs-popup";
import lessonDeleting from "./lessonDeleting";
import lessonChanging from "./lessonChanging";

const Card = () => (
    <div className="card">
        <div className="content">
            {lessonChanging}
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