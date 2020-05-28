import React, {useEffect, useState} from 'react';
import "./comment.css"
import GroupUsers from "../group/groupDB";
import {addDaysTag} from "../../fetches/mainPage";
import {formatDateNews} from "../../fetches/news";
import NewsOptions from "../modals/newsOptions";
import commentOptions from "../modals/commentOptions";
import {currentUserInfo} from "../Profile/profile";
import scheduleAdding from "../modals/scheduleAdding";

function Comment(comment: any, id: any/*, authorComment:any*/) {
    /*const [isLoadedAuthor, setIsLoadedAuthor] = useState(false);
    const [author, setAuthor]: [any, any] = useState([]);*/


    /*function showAuthors() {
        if (isLoadedAuthor) {
            return author;
        }
        return null;
    }*/
    function showButton() {
        /*console.log(currentUserInfo.id, comment.authorId, "NEWS!!!223");*/
        return (currentUserInfo.id === comment.authorId) ? commentOptions(id, comment.id) : null;
    }

    return (
        <div id="commentContainer">
            {/*<div id="commentPhoto"/>*/}
            <img className='avatar littleAvatar' src={"data:image/png;base64," + comment.avatar} alt=""/>

            <div id="commentBody">
                {/*<span id="commentAuthor">{`${author.Name} ${author.Surname}`}</span>*/}
                <div className={'commentHeader'}>
                    <span id="commentAuthor">{`${comment.name} ${comment.surname}`}</span>
                    {showButton()}
                </div>
                <p id="commentContent">{comment.content}</p>
                <span id="commentDate">{formatDateNews(comment.date)}</span>
            </div>
        </div>
    )
}

export default Comment