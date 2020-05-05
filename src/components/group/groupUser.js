import React from 'react';
import './groupUser.css'

function GroupUser({name, email, isGroupLeader}) {
    return(
        <div id='userContainer'>
            <div id="photoContainer">
                <div id="photo">photo</div>
            </div>
            <div id="information">
                <span id="name">{name}</span>
                <span id="email">{email}</span>
            </div>
            <div id="status">{isGroupLeader?"СТАРОСТА":""}</div>
        </div>
    )
}

export default GroupUser
