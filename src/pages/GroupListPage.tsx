import React from "react";
import '../cssDirectory/groupListPage.css';
import GroupUser from "../components/group/groupUser";
import GroupUsers from "../components/group/groupDB"

function GroupListPage() {
    return (
        <div id="groupListContent">
            {GroupUsers.map(user => (
                <GroupUser name={`${user.Surname} ${user.Name} ${user.Patronymic}`} email={user.Email}/>
            ))}
        </div>
    )
}

export default GroupListPage