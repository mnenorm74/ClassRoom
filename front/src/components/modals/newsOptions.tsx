import React from "react";
import Popup from "reactjs-popup";
import newsChanging from "./newsChanging";
import newsDeleting from "./newsDeleting";
import '../News/news.css'

const Card = () => (
    <div className="card" id="newsOptionsField">
        <div className="content">
            {newsChanging}
            {newsDeleting}
        </div>
    </div>
);

function newsOptions() {
    return(
        <Popup
            trigger={ <button className='newsOptions'/> }
            position="left top"
            on="hover" className={'options'}>
            <Card/>
        </Popup>
    )
}

export default newsOptions()