import React, {useEffect, useState} from 'react';
import ScheduleDay from "../components/Schedule/scheduleDay";
import NewsItem from "../components/News/newsItem";
import News from "../components/News/newsDB";
import '../cssDirectory/mainPage.css';

function MainPage() {
    const [isLoadedSchedules, setIsLoadedSchedules] = useState(false);
    let isDown = false;
    let elem: HTMLElement;

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
        console.log(isLoadedSchedules);
        console.log(days.length);
        if(isLoadedSchedules) {
            return days;
        } else {
            return <ScheduleDay day='ВТ 21.04'/>;
        }
    }

    let date = new Date();
    //console.log(date);
    if(date.getDay() !== 1) {
        date.setDate(date.getDate() - date.getDay() + 1)
    }
    //console.log(date);
    // let response = await fetch(`https://localhost:6001/Schedules?startDate=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}&count=${14}`);
    // if(response.ok) {
    //     let json = await response;
    // }
    let days : any = [];
    /*useEffect(() => {
        //console.log("1111");



        // .then((res : any) => {
        //     days = JSON.parse(res.text());
        //     //console.log(res.json());
        //     }
        // )
        // .catch((rej) => {
        //     console.log(rej);
        // })
        // .then(
        //     (result : any) => {
        //         console.log("2"+result);
        //         days = JSON.parse(result);
        //         //days.push(...result);
        //     },
        //     // Примечание: Обрабатывать ошибки необходимо именно здесь
        //     // вместо блока catch(), чтобы не пропустить
        //     // исключения из реальных ошибок в компонентах.
        //     (error) => {
        //         throw error;
        //     }
        //);
        //console.log(a);
        //}, []);
    },[]);*/

    fetch(`https://localhost:6001/Schedules?startDate=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}&count=${14}`
    )
        .then(res => res.json())
        .then(
            (result : any) => {
                for (let i = 0; i < result.length; i++) {
                    days.push(<ScheduleDay day='ПН 20.04' /*lessons={result[i].lessons}*/ />);
                }
                setIsLoadedSchedules(true);
            }
            // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
            // чтобы не перехватывать исключения из ошибок в самих компонентах.
        );

    setTimeout(() => console.log(days), 5000);

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
                {console.log(days)}
            </div>
            <div id="newsModule">
                {News.map(news => (
                    <NewsItem author={news.author} pubDate={news.pubDate} article={news.article}
                              comments={news.comments!}/>
                ))}
            </div>
        </>
    )
}

export default MainPage