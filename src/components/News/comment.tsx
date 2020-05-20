import React from 'react';
import "./comment.css"
import GroupUsers from "../group/groupDB";

function Comment(comment: { AuthorId: string, Content: string, Date: string }) {
    let author = (GroupUsers.filter(user => user.Id === comment.AuthorId))[0];
    return (
        <div id="commentContainer">
            <div id="commentPhoto"/>
            <div id="commentBody">
                <span id="commentAuthor">{`${author.Name} ${author.Surname}`}</span>
                <span id="commentContent">{comment.Content}</span>
                <span id="commentDate">{comment.Date}</span>
            </div>
        </div>
    )
}

export default Comment