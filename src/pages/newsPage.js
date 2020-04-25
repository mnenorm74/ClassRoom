import React from 'react';
import NewsItem from "../components/News/newsItem";
import News from "../components/News/newsDB";
import '../cssDirectory/newsPage.css';

function NewsPage() {
    return (
        <div id="news">
            <NewsItem author={News[0].author} pubDate={News[0].pubDate} article={News[0].article}/>
            <NewsItem author={News[0].author} pubDate={News[0].pubDate} article={News[0].article}/>
            <NewsItem author={News[0].author} pubDate={News[0].pubDate} article={News[0].article}/>
            <NewsItem author={News[0].author} pubDate={News[0].pubDate} article={News[0].article}/>
            <NewsItem author={News[0].author} pubDate={News[0].pubDate} article={News[0].article}/>
        </div>
    )
}

export default NewsPage