import React, {useEffect, useState} from 'react';
import './news.css'
import Comment from "./comment";
import NewsOptions from "../modals/newsOptions";
import {srcUrl} from "../../mySettings";
import {addNewsTag, getNews} from "../../fetches/news";

function NewsItem({author, pubDate, article, comments, id}: { author: string, pubDate: string, article: string, comments: any, id:any }) {
    //const [isAddComment, setIsAddComment] = useState({});
    //console.log(comments, "123");

    let newsComments = typeof comments == "undefined"
        ? <div id="commentsContainer">
        </div>
        : <div id="commentsContainer">
            {comments.map((comment: any) => (
                Comment(comment, id)
            ))}
        </div>;

    function onSubmit() {
        /*if (!isValidForm()) {
            return;
        }*/
        let content: any = document.querySelector("#commentField");
        console.dir(content.value, "CONTENT");
        let res : any = JSON.stringify({"Content" : content.value});
        console.dir(res, "CONTENT11");
        fetch(`${srcUrl}/News/${id}/comments`, {
            method: 'post',
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
            },
            body: res,
        }).then((res) => {
            //setIsAddComment({})
            window.location.reload();
        });
    }
    /*if(isAddComment) {
        // @ts-ignore
        this.forceRefresh();
    }*/
    return (
        <div className='newsContainer'>
            <div className='info'>
                <div className='infoItem newsText title'>{author}</div>
                <div className='infoItem newsText'>
                    {pubDate}
                    <NewsOptions id={id}/>
                </div>
            </div>
            <p className='newsArticle newsText'>{article}</p>
            {newsComments}
            <div id="commentsAdding">
                <div id="commentOwnerPhoto"/>
                <textarea id="commentField"/>
                <button onClick={onSubmit} id="commentSendButton"/>
                {/*<textarea id="commentField"/>
                <button id="commentSendButton"/>*/}
            </div>
        </div>
    )
}

export default NewsItem