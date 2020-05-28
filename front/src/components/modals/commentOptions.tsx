import React from "react";
import Popup from "reactjs-popup";
import commentDeleting from "./commentDeleting";
import commentChanging from "./commentChanging";
import '../News/news.css'
import edit from "../../icons/edit-black-18dp.svg"

const Card = ({id, CommId}: {id : any, CommId : any}) => (
    <div className="card" id="newsOptionsField">
        <div className="content">
            {console.log(id, CommId, "IDID")}
            {commentChanging(id, CommId)}
            {commentDeleting(id, CommId)}
        </div>
    </div>
);

function showButton() {

}

function commentOptions(id : any, CommId : any) {
    return (
        <Popup
            trigger={<img className='commentOptions' src={edit} alt=""/>}
            position="right top"
            on="click" className={'options'}
            closeOnDocumentClick={true}>
            <Card id={id} CommId={CommId}/>
        </Popup>
    )
}

export default commentOptions