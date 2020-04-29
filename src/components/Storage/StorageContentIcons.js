import StorageElements from "./storageDB";
import StorageItem from "./storageItem";
import React from "react";

function StorageContentIcons(){
    return (
        <div id="storage">
            {StorageElements.map(element => (
                <StorageItem type={element.type} name={element.name} owner={element.owner} date={element.date}/>
            ))}
        </div>
    )
}
export default StorageContentIcons