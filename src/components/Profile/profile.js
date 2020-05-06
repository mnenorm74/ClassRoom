import React from 'react';
import './profile.css'
import CurrentUser from "../../СurrentUserInfoDB";

function Profile() {
    return (
        <div className="container">
            <div className="avatar"/>
            <div className="userData">
                <span>{CurrentUser.Name}</span>
            </div>
        </div>
    )
}

export default Profile