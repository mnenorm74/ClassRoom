import React from 'react';
import './lesson.css'

function Lesson({order, name, type}) {

    return (
        <div className='lesson'>
            <i className='lessonOrder'>{order}</i>
            <span>{name}</span>
        </div>
    )
}

export default Lesson