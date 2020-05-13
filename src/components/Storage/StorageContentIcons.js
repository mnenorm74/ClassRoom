import StorageItem from "./storageItem";
import React from "react";

function StorageContentIcons(elements) {
    return (
        <div id="storage">
            {elements.map(element => (
                <StorageItem type={element.type} name={element.name} owner={element.owner} date={element.date}
                             content={element.content} pageElements={elements}/>
            ))}
        </div>
    )
}

export default StorageContentIcons