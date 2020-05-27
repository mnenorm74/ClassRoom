import React from "react";
import Popup from "reactjs-popup";
import newsChanging from "./newsChanging";
import newsDeleting from "./newsDeleting";
import '../News/news.css'

const Card = ({id} : {id:any}) => (
    <div className="card" id="newsOptionsField">
        <div className="content">
            {newsChanging(id)}
            {newsDeleting(id)}
        </div>
    </div>
);

function newsOptions(id:any) {
    return (
        <Popup
            trigger={<button className='newsOptions'/>}
            position="left top"
            on="click" className={'options'}
            closeOnDocumentClick={true}>
            <Card id={id}/>
        </Popup>
    )
}

export default newsOptions