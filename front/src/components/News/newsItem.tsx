import React from 'react';
import './news.css'
import Comment from "./comment";
import newsOptions from "../modals/newsOptions";

function NewsItem({author, pubDate, article, comments}: { author: string, pubDate: string, article: string, comments: any }) {
    console.log("comments");
    console.log(comments, "123");
    let newsComments = typeof comments == "undefined"
        ? <div id="commentsContainer">
        </div>
        : <div id="commentsContainer">
            {comments.map((comment: any) => (
                Comment(comment)
            ))}
        </div>;
    return (
        <div className='newsContainer'>
            <div className='info'>
                <div className='infoItem newsText'>{author}</div>
                <div className='infoItem newsText'>
                    {pubDate}
                    {newsOptions}
                </div>
            </div>
            <p className='newsArticle newsText'>{article}</p>
            {newsComments}
            <div id="commentsAdding">
                <div id="commentOwnerPhoto"/>
                <input id="commentField"></input>
                <button id="commentSendButton"/>
            </div>
        </div>
    )
}

export default NewsItem