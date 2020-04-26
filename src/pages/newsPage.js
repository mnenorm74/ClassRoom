import React from 'react';
import NewsItem from "../components/News/newsItem";
import News from "../components/News/newsDB";
import '../cssDirectory/newsPage.css';

function NewsPage() {
    return (
        <>
            <div id="news">
                {News.map(news => (
                    <NewsItem author={news.author} pubDate={news.pubDate} article={news.article}/>
                ))}
            </div>
        </>
    )
}

export default NewsPage