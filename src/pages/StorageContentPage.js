import React from 'react';
import StorageContentIcons from "../components/Storage/StorageContentIcons";
import '../cssDirectory/storagePage.css';
import ReactDOM from "react-dom";
import Page from "./pageProvider";

function StorageContentPage(storageElements, pageElements) {
    let content = (typeof storageElements != "undefined")
        ? (<div id="icons">
            {StorageContentIcons(storageElements)}
        </div>)
        : (<div id="icons">
        </div>);

    return (<div id="storageElements">
            <div id="navigation">
                <button id="toMainStoragePageButton" onClick={() => {
                    if (typeof pageElements != "undefined") {
                        ReactDOM.render(
                            Page.StorageContentPage(pageElements),
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