import React from "react";
import Popup from "reactjs-popup";
import commentDeleting from "./commentDeleting";
import commentChanging from "./commentChanging";
import '../News/news.css'
import edit from "../../icons/edit-black-18dp.svg"

const Card = () => (
    <div className="card" id="newsOptionsField">
        <div className="content">
            {commentChanging}
            {commentDeleting}
        </div>
    </div>
);

function commentOptions() {
    return (
        <Popup
            trigger={<img className='commentOptions' src={edit} alt=""/>}
            position="right top"
            on="click" className={'options'}
            closeOnDocumentClick={true}>
            <Card/>
        </Popup>
    )
}

export default commentOptions()