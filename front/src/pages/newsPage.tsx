import React from 'react';
import NewsItem from "../components/News/newsItem";
import News from "../components/News/newsDB";
import '../cssDirectory/newsPage.css';
import newsAdding from "../components/modals/newsAdding";

function NewsPage() {
    return (
        <div id="newsContent">
            <div id="newsHeader">
                {newsAdding}
            </div>
            <div id="news">
                {News.map(news => (
                    <NewsItem author={news.author} pubDate={news.pubDate} article={news.article}
                              comments={news.comments!}/>
                ))}
            </div>
        </div>
    )
}

export default NewsPage