import React from 'react';
import './news.css'

function NewsItem({author, pubDate, article}) {

    return (
        <div className='newsContainer'>
            <div className='info'>
                <div className='infoItem newsText'>{author}</div>
                <div className='infoItem newsText'>{pubDate}</div>
            </div>
            <p className='newsArticle newsText'>{article}</p>
            <div id="commentsContainer">

            </div>
            <div id="commentsAdding">
                <div id="commentOwnerPhoto"></div>
                <input id="commentAddingField" placeholder="Добавить комментарий"></input>
                <button id="commentSendButton"></button>
            </div>
        </div>
    )
}

export default NewsItem