import React from 'react';
import StorageTableItem from "./storageTableItem";

function StorageContentTable(elements) {
    return (
        <>
            <div id="tableHeader">
                <p>имя</p>
                <p>владелец</p>
                <p>дата</p>
            </div>
            <div id="tableStorage">
                {elements.map(element => (
                    <StorageTableItem type={element.type} name={element.name} owner={element.owner}
                                      date={element.date}/>
                ))}
            </div>
        </>
    )
}
export default StorageContentTable