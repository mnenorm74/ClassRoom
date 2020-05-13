import React from "react";
import ScheduleDayFull from "../components/ScheduleFull/scheduleDayFull";
import '../components/ScheduleFull/scheduleFull.css'


function SchedulePage() {
    return (
        <>
            <p className={'title'}>СР, 8 апреля 2020</p>
            <div id={'scheduleComponentContainer'}>
                <button className={'arrowButton'}/>
                <div id={'scheduleContainer'}>
                    <ScheduleDayFull day={'Пн'}/>
                    <ScheduleDayFull day={'Пн'}/>
                    <ScheduleDayFull day={'Пн'}/>
                    <ScheduleDayFull day={'Пн'}/>
                </div>
                <button className={'arrowButton right'}/>
            </div>
        </>
    )
}

export default SchedulePage