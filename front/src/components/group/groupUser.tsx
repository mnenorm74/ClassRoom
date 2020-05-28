import React from 'react';
import './groupUser.css'

function GroupUser({name, email, avatar, isGroupLeader}:{name:string, email:string, avatar:any, isGroupLeader?:boolean}) {
    return(
        <div id='userContainer'>
            <div id="photoContainer">
                {/*<div id="photo">{"data:image/png;base64," + avatar}</div>*/}{/*className='avatar'*/}
                <img id="photo" src={"data:image/png;base64," + avatar} alt="avatar"/>
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
