import React, {useEffect, useState} from 'react';
import "./comment.css"
import GroupUsers from "../group/groupDB";
import {getUser} from "../../fetches/users";
import {addDaysTag} from "../../fetches/mainPage";
import {formatDateNews} from "../../fetches/news";

function Comment(comment: { authorId: string, content: string, date: string }) {
    const [isLoadedAuthor, setIsLoadedAuthor] = useState(false);
    const [author, setAuthor] : [any, any] = useState([]);

    useEffect(() => {
        getUser(comment.authorId)
            .then(res => res.json())
            .then(
                (result: any) => {
                    setAuthor(<span id="commentAuthor">{`${result.name} ${result.surname}`}</span>);
                    setIsLoadedAuthor(true);
                }
            );
    },[]);
    function showAuthors() {
        if(isLoadedAuthor) {
            return author;
        }
        return null;
    }
    return (
        <div id="commentContainer">
            <div id="commentPhoto"/>
            <div id="commentBody">
                {/*<span id="commentAuthor">{`${author.Name} ${author.Surname}`}</span>*/}
                {showAuthors()}
                <span id="commentContent">{comment.content}</span>
                <span id="commentDate">{formatDateNews(comment.date)}</span>
            </div>
        </div>
    )
}

export default Comment