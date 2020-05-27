import React, {useEffect, useState} from 'react';
import ScheduleDay from "../components/Schedule/scheduleDay";
import NewsItem from "../components/News/newsItem";
import News from "../components/News/newsDB";
import '../cssDirectory/mainPage.css';
import {srcUrl} from "../mySettings";
import {addDaysTag} from "../fetches/mainPage";
import {getUser} from "../fetches/users";
import {addNewsTag, formatDateNews, getComments, getNews} from "../fetches/news";
import {getSchedules} from "../fetches/schedule";

function MainPage() {
    const [isLoadedSchedules, setIsLoadedSchedules] = useState(false);
    const [scheduleDays, setScheduleDays]: [any, any] = useState([]);
    const [isLoadedNews, setIsLoadedNews] = useState(false);
    const [news, setNews]: [any, any] = useState([]);
    let isDown = false;
    let elem: HTMLElement;

    useEffect(() => {
        getSchedules(14)
            .then(res => res.json())
            .then(
                (result: any) => {
                    setScheduleDays(addDaysTag(result));
                    setIsLoadedSchedules(true);
                }
            );
        getNews()
            .then((res) => res.json())
            .then(
                (result: any) => {
                    setNews(addNewsTag(result));
                    setIsLoadedNews(true);
                })
    }, []);

    function sliderMousedown() {
        elem = document.querySelector('#scheduleModule') as HTMLElement
        elem.style.cursor = "grabbing";
        isDown = true;
    }

    function sliderMouseup() {
        isDown = false;
        elem.style.cursor = "grab";
    }

    function sliderMousemove(e: React.MouseEvent) {
        if (!isDown) return;
        e.preventDefault();
        elem.scrollLeft -= e.movementX
    }

    function showSchedules() {
        if (isLoadedSchedules) {
            //console.log(scheduleDays, "scheduleDays!!!");
            return scheduleDays;
        } else {

            return null;
        }
    }

    function showNews() {
        if (isLoadedNews) {
            //console.log(news, "NEWS!!!");
            return news;
        } else {
            return null;
        }
    }


    return (
        <>
            <div id="scheduleModule" onMouseDown={sliderMousedown} onMouseUp={sliderMouseup}
                 onMouseMove={sliderMousemove}>
                {/*<ScheduleDay day='ПН 20.04'/>
                <ScheduleDay day='ВТ 21.04'/>
                <ScheduleDay day='СР 22.04'/>
                <ScheduleDay day='ЧТ 23.04'/>
                <ScheduleDay day='ПТ 24.04'/>
                <ScheduleDay day='СБ 25.04'/>
                <ScheduleDay day='ПН 27.04'/>
                <ScheduleDay day='ВТ 28.04'/>
                <ScheduleDay day='СР 29.04'/>*/}
                {showSchedules()}

            </div>
            <div id="newsModule">
                {/*{News.map(news => (
                    <NewsItem author={news.author} pubDate={news.pubDate} article={news.article}
                              comments={news.comments!}/>
                ))}*/}

                {showNews()}
            </div>
        </>
    )
    /*}else {
        return (
            <>
            </>
        )
    }*/
}

export default MainPage