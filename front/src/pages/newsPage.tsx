import React, {useEffect, useState} from 'react';
import NewsItem from "../components/News/newsItem";
import News from "../components/News/newsDB";
import '../cssDirectory/newsPage.css';
import Popup from "reactjs-popup";
import {getUser} from "../fetches/users";
import {formatDateNews, getComments, getNews} from "../fetches/news";
import newsAdding from "../components/modals/newsAdding";

function NewsPage() {
    const [isLoadedNews, setIsLoadedNews] = useState(false);
    const [news, setNews]: [any, any] = useState([]);

    useEffect(() => {
        getNews()
            .then((res) => res.json())
            .then(
                (result: any[]) => {
                    let tags: any[] = [];
                    for (let i = 0; i < result.length; i++) {
                        getUser(result[i].authorId)
                            .then(author => author.json())
                            .then((author) => {
                                Promise.all([getUser(result[i].authorId).then(author => author.json()),
                                    getComments(result[i].id).then(comments => comments.json())])
                                    .then((res)=>{
                                        console.log(res,"News00");
                                        tags.push(<NewsItem author={res[0].name + ' ' + res[0].surname}
                                                            pubDate={formatDateNews(result[i].date)}
                                                            article={result[i].content}
                                                            comments={res[1]}
                                                            key={i}/>);
                                    })
                                    .then(() => {
                                        if (i === result.length - 1) {
                                            setNews(tags);
                                            //console.log(tags, "Green");
                                            setIsLoadedNews(true);
                                        }
                                    })
                            });
                    }
                },
                (error => console.log(error))
            )
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