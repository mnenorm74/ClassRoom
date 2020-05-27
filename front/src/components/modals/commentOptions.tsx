import React from "react";
import Popup from "reactjs-popup";
import commentDeleting from "./commentDeleting";
import commentChanging from "./commentChanging";
import '../News/news.css'

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
            trigger={<button className='commentOptions'/>}
            position="left top"
            on="click" className={'options'}
            closeOnDocumentClick={true}>
            <Card/>
        </Popup>
    )
}

export default commentOptions()