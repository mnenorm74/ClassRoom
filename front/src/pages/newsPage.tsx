import React, {useEffect, useState} from 'react';
import NewsItem from "../components/News/newsItem";
import News from "../components/News/newsDB";
import '../cssDirectory/newsPage.css';
import Popup from "reactjs-popup";
import {getUser} from "../fetches/users";
import {formatDateNews, getComments, getNews} from "../fetches/news";

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
                                getComments(result[i].id)
                                    .then(comments => comments.json())
                                    .then(comments => {
                                        tags.push(<NewsItem author={author.name + ' ' + author.surname}
                                                            pubDate={formatDateNews(result[i].date)}
                                                            article={result[i].content}
                                                            comments={comments}
                                                            key={i}/>);
                                        //console.log(author, comments, "AAAAA")
                                    })
                                    .then(() => {
                                        if (i === result.length - 1) {
                                            setNews(tags);
                                            console.log(tags, "Green");
                                            setIsLoadedNews(true);
                                        }
                                    })
                            });
                    }
                    console.log(tags, "Red");
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
                <Popup trigger={<button id="newsAdding"></button>} modal>
                    {close => (
                        <div className="modal">
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                            <div className="header">ДОБАВИТЬ НОВОСТЬ</div>
                            <div className="content">
                                <span className="modalContentHeader">Заголовок</span>
                                <input type="text" id="addingNewsHeader"></input>
                                <span className="modalContentHeader">Содержание</span>
                                <textarea id="addingNewsContent"></textarea>
                            </div>
                            <div className="modalFooter">
                                <button className="sendingButton">Добавить</button>
                            </div>
                        </div>
                    )}
                </Popup>
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