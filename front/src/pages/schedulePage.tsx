import React, {useEffect, useState} from "react";
import ScheduleDayFull from "../components/ScheduleFull/scheduleDayFull";
import '../components/ScheduleFull/scheduleFull.css'
import scheduleAdding from "../components/modals/scheduleAdding";
import {addFullDaysTag, getCurrentDate, getSchedules} from "../fetches/schedule";
import {addDaysTag} from "../fetches/mainPage";

function SchedulePage() {
    const [isLoadedSchedules, setIsLoadedSchedules] = useState(false);
    const [scheduleDays, setScheduleDays]: [any, any] = useState([]);

    useEffect(() => {
        getSchedules(7)
            .then(res => res.json())
            .then(
                (result: any) => {
                    setScheduleDays(addFullDaysTag(result));
                    setIsLoadedSchedules(true);
                }
            );
    }, []);

    function showSchedules() {
        if (isLoadedSchedules) {
            return scheduleDays;
        } else {
            return null;
        }
    }

    return (
        <>
            <div id="schedulePageHeader">
                {scheduleAdding}
            </div>
            <p className={'title'}>{getCurrentDate()}{/*СР, 8 апреля 2020*/}</p>
            <div id={'scheduleComponentContainer'}>
                <button className={'arrowButton'}/>
                <div id={'scheduleContainer'}>
                    {/*<ScheduleDayFull day={'Пн'}/>*/}
                    {/*<ScheduleDayFull day={'Пн'}/>*/}
                    {/*<ScheduleDayFull day={'Пн'}/>*/}
                    {/*<ScheduleDayFull day={'Пн'}/>*/}
                    {showSchedules()}
                </div>
                <button className={'arrowButton right'}/>
            </div>
        </>
    )
}

export default SchedulePage