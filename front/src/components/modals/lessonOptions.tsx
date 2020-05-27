import React from "react";
import Popup from "reactjs-popup";
import lessonDeleting from "./lessonDeleting";
import lessonChanging from "./lessonChanging";

const Card = ({id, day} : {id: any, day: any}) => (
    <div className="card">
        <div className="content">
            {lessonChanging(id, day)}
            {lessonDeleting(id, day)}
        </div>
    </div>
);

function lessonOptions(id : any, day: any) {
    return(
        <Popup
            trigger={ <button className={'lessonOptions'}/> }
            position="right top"
            on="click" className={'options'}>
            <Card id={id} day ={day}/>
        </Popup>
    )
}

export default lessonOptions