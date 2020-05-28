import React, {useEffect, useState} from 'react';
import "./comment.css"
import GroupUsers from "../group/groupDB";
import {getUser} from "../../fetches/users";
import {addDaysTag} from "../../fetches/mainPage";
import {formatDateNews} from "../../fetches/news";
import NewsOptions from "../modals/newsOptions";
import commentOptions from "../modals/commentOptions";

function Comment(comment:any, id:any) {
    const [isLoadedAuthor, setIsLoadedAuthor] = useState(false);
    const [author, setAuthor]: [any, any] = useState([]);

    useEffect(() => {
        getUser(comment.authorId)
            .then(res => res.json())
            .then(
                (result: any) => {
                    setAuthor(<span id="commentAuthor">{`${result.name} ${result.surname}`}</span>);
                    setIsLoadedAuthor(true);
                }
            );
    }, []);

    function showAuthors() {
        if (isLoadedAuthor) {
            return author;
        }
        return null;
    }

    return (
        <div id="commentContainer">
            <div id="commentPhoto"/>
            <div id="commentBody">
                {/*<span id="commentAuthor">{`${author.Name} ${author.Surname}`}</span>*/}
                <div className={'commentHeader'}>
                    {showAuthors()}
                    {commentOptions(id, comment.id)}
                </div>
                <p id="commentContent">{comment.content}</p>
                <span id="commentDate">{formatDateNews(comment.date)}</span>
            </div>
        </div>
    )
}

export default Comment