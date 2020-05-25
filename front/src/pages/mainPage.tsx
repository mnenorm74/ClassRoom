import React, {useEffect, useState} from 'react';
import ScheduleDay from "../components/Schedule/scheduleDay";
import NewsItem from "../components/News/newsItem";
import News from "../components/News/newsDB";
import '../cssDirectory/mainPage.css';
import {srcUrl} from "../mySettings";
import {addDaysTag, addNewsTag, getNews, getSchedules} from "../fetches/mainPage";
import {getUser} from "../fetches/users";
import {formatDateNews, getComments} from "../fetches/news";

function MainPage() {
    const [isLoadedSchedules, setIsLoadedSchedules] = useState(false);
    const [scheduleDays, setScheduleDays] : [any[], any] = useState([]);
    const [isLoadedNews, setIsLoadedNews] = useState(false);
    const [news, setNews] : [any, any] = useState([]);
    let isDown = false;
    let elem: HTMLElement;

    useEffect(() => {
        getSchedules()
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
                (result: any[]) => {
                    let tags : any[] = [];
                    for (let i = 0; i < result.length; i++) {
                        getUser(result[i].authorId)
                            .then(author => author.json())
                            .then((author) => {
                                getComments(result[i].id)
                                    .then(comments => comments.json())
                                    .then(comments => {
                                        tags.push(<NewsItem author={author.name + ' ' + author.surname}
                                                       pubDate={formatDateNews(result[i].date)}
                                                       article={result[i].content}
                                                       comments={comments} />);
                                        if(i === result.length - 1) {
                                            setNews(tags);
                                            console.log(tags, "Green");
                                            //setNews(res);
                                            setIsLoadedNews(true);
                                        }
                                    //console.log(author, comments, "AAAAA")
                                });
                            });
                    }
                    console.log(tags, "Red");
                    /*setNews(tags.entries());*/

                    //setNews(res);
                   /* setIsLoadedNews(true);*/
                },
                (error => console.log(error))
            )
    },[]);

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

    function a() {
        if(isLoadedSchedules) {
            //console.log(scheduleDays, "scheduleDays!!!");
            return scheduleDays;
        } else {

            return null;
        }
    }
    function a1() {
        if(isLoadedNews) {
            console.log(news, "NEWS!!!");
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
                {a()}

            </div>
            <div id="newsModule">
                {/*{News.map(news => (
                    <NewsItem author={news.author} pubDate={news.pubDate} article={news.article}
                              comments={news.comments!}/>
                ))}*/}

                {a1()}
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