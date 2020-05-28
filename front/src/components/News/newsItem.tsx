import React, {useEffect, useState} from 'react';
import './news.css'
import Comment from "./comment";
import NewsOptions from "../modals/newsOptions";
import {srcUrl} from "../../mySettings";
import {addComments, addNewsTag, getComments, getNews} from "../../fetches/news";
import {currentUserAvatar} from "../Profile/profile";

function NewsItem({author, pubDate, article, /*comments,*/ id, title}: { author: string, pubDate: string, article: string, /*comments: any,*/ id:any, title:any }) {
    const [isAddComments, setIsAddComments] = useState(false);
    const [isLoadComments, setIsLoadComments] = useState(false);
    const [comments, setComments] : [any[], any] = useState([]);
    //console.log(comments, "123");
    useEffect(() => {
        getComments(id)
            .then((res) => res.json())
            .then(
                (result: any) => {
                    setComments(addComments(result, id) );
                    setIsLoadComments(true);
                })
    },[isAddComments]);
   /* let newsComments = typeof comments == "undefined"
        ? <div id="commentsContainer"/>
        : <div id="commentsContainer">
            {comments.map((comment: any) => (
                Comment(comment, id, author)
            ))}
        </div>;*/

    function onSubmit() {
        /*if (!isValidForm()) {
            return;
        }*/
        let content: any = document.querySelector("#commentField");
        console.dir(content.value, "CONTENT");
        let res : any = JSON.stringify({"Content" : content.value});
        console.dir(res, "CONTENT11");
        //setIsLoadComments(false);
        fetch(`${srcUrl}/News/${id}/comments`, {
            method: 'post',
            credentials: "include",
            headers: {
                "Content-Type" : "application/json"
            },
            body: res,
        }).then((res) => {

            setIsAddComments(false);
            setIsAddComments(true);
            content.value = "";
            //window.location.reload();
        });
    }

    function showComments() {
        if(isLoadComments) {
            return comments;
        } else {
            return null;
        }
    }

    /*if(isAddComment) {
        // @ts-ignore
        this.forceRefresh();
    }*/
    return (
        <div className='newsContainer'>
            <div className='info'>
                <div className='infoItem newsText '>{author}</div>
                <div className='infoItem newsText'>
                    {pubDate}
                    <NewsOptions id={id}/>
                </div>
            </div>
            <div className='infoItem newsText title'>{title}</div>
            <p className='newsArticle newsText'>{article}</p>
            {showComments()}
            <div id="commentsAdding">
                {/*<div id="commentOwnerPhoto"/>*/}
                <img className='avatar' src={"data:image/png;base64," + currentUserAvatar.avatar} alt=""/>
                <textarea id="commentField"/>
                <button onClick={onSubmit} id="commentSendButton"/>
                {/*<textarea id="commentField"/>
                <button id="commentSendButton"/>*/}
            </div>
        </div>
    )
}

export default NewsItem