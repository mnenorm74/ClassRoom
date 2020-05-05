import React from "react";
import '../cssDirectory/groupListPage.css';
import GroupUser from "../components/group/groupUser";
import GroupUsers from "../components/group/groupDB"

function GroupListPage(){
    return(
        <div id="groupListContent">
            {GroupUsers.map(user => (
                <GroupUser name={user.name} email={user.email} isGroupLeader={user.isGroupLeader}/>
            ))}
        </div>
    )
}

export default GroupListPage