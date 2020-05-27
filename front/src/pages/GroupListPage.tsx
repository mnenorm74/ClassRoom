import React, {useEffect, useState} from "react";
import '../cssDirectory/groupListPage.css';
import GroupUser from "../components/group/groupUser";
import GroupUsers from "../components/group/groupDB"
import {addNewsTag, getNews} from "../fetches/news";
import {addUsersTag, getGroup} from "../fetches/users";

function GroupListPage() {
    const [users, setUsers]: [any, any] = useState([]);
    const [isLoadedUsers, setIsLoadedUsers] = useState(false);
    useEffect(() => {
        getGroup()
            .then((res) => res.json())
            .then(
                (result: any[]) => {
                    setUsers(addUsersTag(result));
                    setIsLoadedUsers(true);
                })
    },[]);

    function showUsers() {
        if(isLoadedUsers) {
            //console.log(users, "USERS");
            return users;
        } else {
            return null;
        }
    }
    return (
        <div id="groupListContent">
            {/*{GroupUsers.map(user => (
                <GroupUser name={`${user.Surname} ${user.Name} ${user.Patronymic}`} email={user.Email}/>
            ))}*/}
            {showUsers()}
        </div>
    )
}

export default GroupListPage