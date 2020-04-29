import React from 'react';
import StorageElements from "./storageDB";
import StorageTableItem from "./storageTableItem";

function StorageContentTable() {
    return (
        <>
            <div id="tableHeader">
                <p>имя</p>
                <p>владелец</p>
                <p>дата</p>
            </div>
            <div id="tableStorage">
                {StorageElements.slice(0, 6).map(element => (
                    <StorageTableItem type={element.type} name={element.name} owner={element.owner}
                                      date={element.date}/>
                ))}
            </div>
        </>
    )
}
export default StorageContentTable