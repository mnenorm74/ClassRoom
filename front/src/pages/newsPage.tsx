import React, {useEffect, useState} from 'react';
import NewsItem from "../components/News/newsItem";
import News from "../components/News/newsDB";
import '../cssDirectory/newsPage.css';
import Popup from "reactjs-popup";
import {addNewsTag, formatDateNews, getComments, getNews} from "../fetches/news";
import newsAdding from "../components/modals/newsAdding";
import CurrentUser from "../СurrentUserInfoDB";
import {currentUserInfo} from "../components/Profile/profile";

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
    },[isLoadedNews]);

    function showNews() {
        if (isLoadedNews) {
            return news;
        } else {
            return null;
        }
    }

    function showButton() {
        if (isLoadedNews) {
            return (currentUserInfo.isLeader) ? newsAdding : null;
        } else {
            return null;
        }
    }
    return (
        <div id="newsContent">
            <div id="newsHeader">
                {showButton()}
            </div>
            <div id="news">
                {showNews()}
            </div>
        </div>
    )
}

export default NewsPage