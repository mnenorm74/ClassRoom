import React from "react";

function PageContainer({component}) {
    let elem = (component)
    return (
        <div id="pageContainer">
            {elem}
        </div>
    )
}

export default PageContainer