import React from 'react';
import NewsItem from "../components/News/newsItem";
import News from "../components/News/newsDB";
import '../cssDirectory/newsPage.css';
import Popup from "reactjs-popup";

function NewsPage() {
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
                {News.map(news => (
                    <NewsItem author={news.author} pubDate={news.pubDate} article={news.article}
                              comments={news.comments!}/>
                ))}
            </div>
        </div>
    )
}

export default NewsPage