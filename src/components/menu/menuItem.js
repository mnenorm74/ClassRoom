import React from "react";
import './menuItems.css'
import ReactDOM from "react-dom";
import Page from "../../pages/pageProvider";
import Logo from './logoContainer'

function MenuItem({link, text, img}) {
    let icon = '';
    switch (link) {
        case Page.MainPage:
        icon = Logo.mainLogo
            break
        case Page.NewsPage:
            icon = Logo.newsLogo
            break
        case Page.SchedulePage:
            icon = Logo.scheduleLogo
            break
        case Page.StoragePage:
            icon = Logo.storageLogo
            break
    }
    return (
        <div className='navMenuItem' onClick={event => {
            ReactDOM.render(
                link(),
                document.getElementById('pageContainer')
            );
        }}><img className='ico' src={icon}/>
            <span className='itemName'>{text}</span>
        </div>
    )
}

export default MenuItem