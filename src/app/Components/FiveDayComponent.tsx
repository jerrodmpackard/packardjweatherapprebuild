import React from 'react'

const FiveDayComponent = (props: {
    day: string,
    icon: string,
    high: string,
    low: string
}) => {
    return (
        <div className='grid'>
            <div>
                <h1>{props.day}</h1>
                <img src={props.icon} alt="Weather icon" />
                <p>{props.high}</p>
                <p>{props.low}</p>
            </div>
        </div>
    )
}

export default FiveDayComponent
