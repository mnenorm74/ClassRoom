import React from 'react';
import ScheduleDay from "../components/Schedule/scheduleDay";
import NewsItem from "../components/News/newsItem";
import News from "../components/News/newsDB";
import '../cssDirectory/mainPage.css';

function MainPage() {
    let isDown = false;
    let elem;

    function sliderMousedown(e) {
        elem = document.querySelector('#scheduleModule')
        isDown = true;
    }

    function sliderMouseup() {
        isDown = false;
    }

    function sliderMousemove(e) {
        if (!isDown) return;
        e.preventDefault();
        elem.scrollLeft -= e.movementX
    }

    return (
        <>
            <div id="scheduleModule" onMouseDown={sliderMousedown} onMouseUp={sliderMouseup}
                 onMouseMove={sliderMousemove}>
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

export default MainPage