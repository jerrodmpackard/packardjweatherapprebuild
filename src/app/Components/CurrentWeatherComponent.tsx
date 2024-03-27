import React from 'react'

const CurrentWeatherComponent = (props: {
    cityName: string,
    currentWeather: string,
    currentConditions: string,
    highLow: string,
    icon: string
}) => {
    return (
        <div className='divBackground grid grid-cols-2'>
            {/* heart button */}
            <div className='col-span-2'>
                <img src="" alt="" />
            </div>

            <div>
                <h1>{props.cityName}</h1>
                <p>{props.currentWeather}</p>
                <p>{props.currentConditions}</p>
                <p>{props.highLow}</p>
            </div>

            {/* weather image */}
            <div>
                <img src={props.icon} alt="Current weather icon" />
            </div>
        </div>
    )
}

export default CurrentWeatherComponent
