import React from 'react';
import './news.css'

function NewsItem({author, pubDate, article}) {

    return (
        <div className='newsContainer'>
            <div className='info'>
                <div className='infoItem newsText'>{author}</div>
                <div className='infoItem newsText'>{pubDate}</div>
            </div>
            <p className='newsArticle newsText'>{article}</p>
        </div>
    )
}

export default NewsItem