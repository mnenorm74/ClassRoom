import React from 'react';
import './news.css'
import Comment from "./comment";
import {IComment} from "../../projectTypes";

function NewsItem({author, pubDate, article, comments}: { author: string, pubDate: string, article: string, comments: IComment[] }) {
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
                <div id="commentOwnerPhoto"/>
                <input id="commentAddingField" placeholder="Добавить комментарий"/>
                <button id="commentSendButton"/>
            </div>
        </div>
    )
}

export default NewsItem