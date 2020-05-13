import React from 'react';
import './news.css'
import News from "./newsDB";
import Comment from "./comment";

function NewsItem({author, pubDate, article, comments}) {
    let newsComments = typeof comments == "undefined"
        ? <div id="commentsContainer">
        </div>
        : <div id="commentsContainer">
            {comments.map(comment => (
                Comment(comment)
            ))}
        </div>;
    return (
        <div className='newsContainer'>
            <div className='info'>
                <div className='infoItem newsText'>{author}</div>
                <div className='infoItem newsText'>{pubDate}</div>
            </div>
            <p className='newsArticle newsText'>{article}</p>
            {newsComments}
            <div id="commentsAdding">
                <div id="commentOwnerPhoto"></div>
                <input id="commentAddingField" placeholder="Добавить комментарий"></input>
                <button id="commentSendButton"></button>
            </div>
        </div>
    )
}

export default NewsItem