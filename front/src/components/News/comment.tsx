import React, {useEffect, useState} from 'react';
import "./comment.css"
import GroupUsers from "../group/groupDB";
import {addDaysTag} from "../../fetches/mainPage";
import {formatDateNews} from "../../fetches/news";
import NewsOptions from "../modals/newsOptions";
import commentOptions from "../modals/commentOptions";

function Comment(comment:any, id:any/*, authorComment:any*/) {
    /*const [isLoadedAuthor, setIsLoadedAuthor] = useState(false);
    const [author, setAuthor]: [any, any] = useState([]);*/



    /*function showAuthors() {
        if (isLoadedAuthor) {
            return author;
        }
        return null;
    }*/

    return (
        <div id="commentContainer">
            {/*<div id="commentPhoto"/>*/}
            <img className='avatar littleAvatar' src={"data:image/png;base64," + comment.avatar} alt=""/>

            <div id="commentBody">
                {/*<span id="commentAuthor">{`${author.Name} ${author.Surname}`}</span>*/}
                <div className={'commentHeader'}>
                    <span id="commentAuthor">{`${comment.name} ${comment.surname}`}</span>
                    {commentOptions(id, comment.id)}
                </div>
                <p id="commentContent">{comment.content}</p>
                <span id="commentDate">{formatDateNews(comment.date)}</span>
            </div>
        </div>
    )
}

export default Comment