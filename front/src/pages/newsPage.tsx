import React, {useEffect, useState} from 'react';
import NewsItem from "../components/News/newsItem";
import News from "../components/News/newsDB";
import '../cssDirectory/newsPage.css';
import Popup from "reactjs-popup";
import {getUser} from "../fetches/users";
import {addNewsTag, formatDateNews, getComments, getNews} from "../fetches/news";
import newsAdding from "../components/modals/newsAdding";

function NewsPage() {
    //const [isLoadedAllNews, setIsLoadedAllNews] = useState(false);
    const [news, setNews]: [any, any] = useState([]);
    const [isLoadedNews, setIsLoadedNews] = useState(false);

    useEffect(() => {
        getNews()
            .then((res) => res.json())
            .then(
                (result: any) => {
                    setNews(addNewsTag(result));
                    setIsLoadedNews(true);
                })
    },[]);

    function showNews() {
        if (isLoadedNews) {
            //console.log(news, "NEWS!!!");
            return news;
        } else {
            return null;
        }
    }
    return (
        <div id="newsContent">
            <div id="newsHeader">
                {newsAdding}
            </div>
            <div id="news">
                {/*{News.map(news => (
                    <NewsItem author={news.author} pubDate={news.pubDate} article={news.article}
                              comments={news.comments!}/>
                ))}*/}
                {showNews()}
            </div>
        </div>
    )
}

export default NewsPage