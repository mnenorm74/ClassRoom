import React, {useEffect, useState} from "react";
import ScheduleDayFull from "../components/ScheduleFull/scheduleDayFull";
import '../components/ScheduleFull/scheduleFull.css'
import scheduleAdding from "../components/modals/scheduleAdding";
import {addFullDaysTag, getCurrentDate, getSchedules} from "../fetches/schedule";
import {addDaysTag} from "../fetches/mainPage";
import {currentUserInfo} from "../components/Profile/profile";
import newsAdding from "../components/modals/newsAdding";

function SchedulePage() {
    const [isLoadedSchedules, setIsLoadedSchedules] = useState(false);
    const [scheduleDays, setScheduleDays]: [any, any] = useState([]);
    const [currentWeek, setWeek]: [any, any] = useState(0)
    useEffect(() => {
        getSchedules(7, currentWeek)
            .then(res => res.json())
            .then(
                (result: any) => {
                    setScheduleDays(addFullDaysTag(result));
                    setIsLoadedSchedules(true);
                }
            );
    }, [currentWeek]);

    function showSchedules() {
        if (isLoadedSchedules) {
            return scheduleDays;
        } else {
            return null;
        }
    }

    function showButton() {
        if (isLoadedSchedules) {
            console.log(currentUserInfo.isLeader, "NEWS!!!");
            return (currentUserInfo.isLeader) ? scheduleAdding : null;
        } else {
            return null;
        }
    }

    return (
        <>
            <div id="schedulePageHeader">
               {showButton()}
            </div>
            <p className={'title'}>{getCurrentDate()}{/*СР, 8 апреля 2020*/}</p>
            <div id={'scheduleComponentContainer'}>
                <button className={'arrowButton'} onClick={() => {
                    if (currentWeek !== 0)
                        setWeek(currentWeek - 1)
                }}/>
                <div id={'scheduleContainer'}>
                    {showSchedules()}
                </div>
                <button className={'arrowButton right'} onClick={() => {
                    setWeek(currentWeek + 1)

                }}/>
            </div>
        </>
    )
}

export default SchedulePage