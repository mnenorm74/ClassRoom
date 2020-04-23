import React from 'react';
import ScheduleDay from "../components/Schedule/scheduleDay";
import NewsItem from "../components/News/newsItem";
import News from "../components/News/newsDB";
import '../cssDirectory/mainPage.css';

function MainPage() {
    return (
        <>
            <div id="scheduleModule" onWheel={scrollHorizontally}>
                <ScheduleDay day='ПН 20.04'/>
                <ScheduleDay day='ВТ 21.04'/>
                <ScheduleDay day='СР 22.04'/>
                <ScheduleDay day='ЧТ 23.04'/>
                <ScheduleDay day='ПТ 24.04'/>
                <ScheduleDay day='СБ 25.04'/>
                <ScheduleDay day='ПН 27.04'/>
                <ScheduleDay day='ВТ 28.04'/>
                <ScheduleDay day='СР 29.04'/>
            </div>
            <div id="newsModule">
                <NewsItem author={News[0].author} pubDate={News[0].pubDate} article={News[0].article}/>
                <NewsItem author={News[0].author} pubDate={News[0].pubDate} article={News[0].article}/>
                <NewsItem author={News[0].author} pubDate={News[0].pubDate} article={News[0].article}/>
                <NewsItem author={News[0].author} pubDate={News[0].pubDate} article={News[0].article}/>
            </div>
        </>
    )
}

function scrollHorizontally(e) {
    e = window.event || e;
    let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    document.getElementById('scheduleModule').scrollLeft -= (delta * 40);

}

export default MainPage