import React from 'react';
import StorageContentIcons from "../components/Storage/StorageContentIcons";
import '../cssDirectory/storagePage.css';
import ReactDOM from "react-dom";
import Page from "./pageProvider";

function StorageContentPage(pageElements:any, previousPageElements?:any) {
    let content = (typeof pageElements != "undefined")
        ? (<div id="icons">
            {StorageContentIcons(pageElements)}
        </div>)
        : (<div id="icons">
        </div>);

    return (<div id="storageElements">
            <div id="navigation">
                <button id="toMainStoragePageButton" onClick={() => {
                    if (typeof previousPageElements != "undefined") {
                        ReactDOM.render(
                            Page.StorageContentPage(previousPageElements),
                            document.getElementById('pageContainer')
                        )
                    } else {
                        ReactDOM.render(
                            Page.StoragePage(),
                            document.getElementById('pageContainer')
                        )
                    }
                }
                }/>
            </div>
            {content}
        </div>
    );
}

export default StorageContentPage