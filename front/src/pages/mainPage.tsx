import React, {useEffect} from 'react';
import ScheduleDay from "../components/Schedule/scheduleDay";
import NewsItem from "../components/News/newsItem";
import News from "../components/News/newsDB";
import '../cssDirectory/mainPage.css';

function MainPage() {
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

    let date = new Date();
    console.log(date);
    if(date.getDay() !== 1) {
        date.setDate(date.getDate() - date.getDay() + 1)
    }
    console.log(date);
    // let response = await fetch(`https://localhost:6001/Schedules?startDate=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}&count=${14}`);
    // if(response.ok) {
    //     let json = await response;
    // }
    let days : any = [];
    useEffect(() => {
        console.log("1111");
        let a = fetch(`https://localhost:6001/Schedules?startDate=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}&count=${14}`)
            .then(res => {
                res.json();
                console.log("1"+res);
                }
            )
            .then(
                (result) => {
                    console.log("1"+result);
                    days = JSON.stringify(result);
                    //days.push(...result);
                },
                // Примечание: Обрабатывать ошибки необходимо именно здесь
                // вместо блока catch(), чтобы не пропустить
                // исключения из реальных ошибок в компонентах.
                (error) => {
                    throw error;
                }
            )
    }, []);

    console.log(days);

    let scheduleDays : any = [];
    for (let i = 0; i < days.length; i++) {
        // @ts-ignore
        scheduleDays.push(<ScheduleDay day={days[i].date} lessons={days[i].lessons} />);
    }

    console.log(scheduleDays);

    return (
        <>
            <div id="scheduleModule" onMouseDown={sliderMousedown} onMouseUp={sliderMouseup}
                 onMouseMove={sliderMousemove}>
                {/*<ScheduleDay day='ПН 20.04'/>*/}
                {/*<ScheduleDay day='ВТ 21.04'/>*/}
                {/*<ScheduleDay day='СР 22.04'/>*/}
                {/*<ScheduleDay day='ЧТ 23.04'/>*/}
                {/*<ScheduleDay day='ПТ 24.04'/>*/}
                {/*<ScheduleDay day='СБ 25.04'/>*/}
                {/*<ScheduleDay day='ПН 27.04'/>*/}
                {/*<ScheduleDay day='ВТ 28.04'/>*/}
                {/*<ScheduleDay day='СР 29.04'/>*/}
                {scheduleDays}
            </div>
            <div id="newsModule">
                {News.map(news => (
                    <NewsItem author={news.author} pubDate={news.pubDate} article={news.article} comments={news.comments!}/>
                ))}
            </div>
        </>
    )
}

export default MainPage