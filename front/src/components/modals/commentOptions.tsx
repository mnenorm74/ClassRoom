import React from "react";
import Popup from "reactjs-popup";
import commentDeleting from "./commentDeleting";
import commentChanging from "./commentChanging";
import '../News/news.css'

const Card = ({id, CommId}: {id : any, CommId : any}) => (
    <div className="card" id="newsOptionsField">
        <div className="content">
            {console.log(id, CommId, "IDID")}
            {commentChanging(id, CommId)}
            {commentDeleting(id, CommId)}
        </div>
    </div>
);

function commentOptions(id : any, CommId : any) {
    return (
        <Popup
            trigger={<button className='commentOptions'/>}
            position="left top"
            on="click" className={'options'}
            closeOnDocumentClick={true}>
            <Card id={id} CommId={CommId}/>
        </Popup>
    )
}

export default commentOptions