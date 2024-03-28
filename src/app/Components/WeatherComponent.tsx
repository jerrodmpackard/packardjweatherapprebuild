'use client'
import React, { useEffect, useState } from 'react'
import { Coord, ICurrentWeather } from '../Interfaces/ICurrentWeather';
import { currentGeoWeatherCall, currentWeatherCall, fiveDayGeoWeatherCall, fiveDayWeatherCall } from '../Utils/DataServices';
import { PiHeartStraightDuotone } from 'react-icons/pi'

const WeatherComponent = () => {

    // Current Weather Use States
    const [cityName, setCityName] = useState<string>('');
    const [currentWeather, setCurrentWeather] = useState<string>('');
    const [currentConditions, setCurrentConditions] = useState<string>('');
    const [highLow, setHighLow] = useState<string>('');
    const [icon, setIcon] = useState<string>('');
    const [error, setError] = useState<string | null>(null);


    // Five Day Forecast Use States
    const [day1, setDay1] = useState<string>('');
    const [day1Icon, setDay1Icon] = useState<string>('');
    const [day1High, setDay1High] = useState<string>('');
    const [day1Low, setDay1Low] = useState<string>('');

    const [day2, setDay2] = useState<string>('');
    const [day2Icon, setDay2Icon] = useState<string>('');
    const [day2High, setDay2High] = useState<string>('');
    const [day2Low, setDay2Low] = useState<string>('');

    const [day3, setDay3] = useState<string>('');
    const [day3Icon, setDay3Icon] = useState<string>('');
    const [day3High, setDay3High] = useState<string>('');
    const [day3Low, setDay3Low] = useState<string>('');

    const [day4, setDay4] = useState<string>('');
    const [day4Icon, setDay4Icon] = useState<string>('');
    const [day4High, setDay4High] = useState<string>('');
    const [day4Low, setDay4Low] = useState<string>('');

    const [day5, setDay5] = useState<string>('');
    const [day5Icon, setDay5Icon] = useState<string>('');
    const [day5High, setDay5High] = useState<string>('');
    const [day5Low, setDay5Low] = useState<string>('');


    let lat: any;
    let lon: any;
    let dayNames: string[];


    const getGeoWeatherData = async (lat: any, lon: any) => {
        let data = await currentGeoWeatherCall(lat, lon);
        setCityName(`${data.name}, ${data.sys.country}`);
        setCurrentWeather(`${Math.round(data.main.temp)}° F`);
        setCurrentConditions(`${data.weather[0].description}`);
        setHighLow(`High: ${Math.round(data.main.temp_max)}° Low: ${Math.round(data.main.temp_min)}°`);
        setIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    }


    const getWeatherData = async (city: string) => {
        let data = await currentWeatherCall(city);
        setCityName(`${data.name}, ${data.sys.country}`);
        setCurrentWeather(`${Math.round(data.main.temp)}° F`);
        setCurrentConditions(`${data.weather[0].description}`);
        setHighLow(`High: ${Math.round(data.main.temp_max)}° Low: ${Math.round(data.main.temp_min)}°`);
        setIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    }


    const getFiveDayWeatherData = async (city: string) => {
        let data = await fiveDayWeatherCall(city);

        dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let dayOne = new Date(data.list[0].dt_txt);
        console.log(dayOne);
        let dayOneDay = dayOne.getDay();
        console.log(dayOneDay);
        setDay1(dayNames[dayOneDay]);
        setDay1Icon(`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`);
        setDay1High(`H: ${Math.round(data.list[0].main.temp_max)}°`);
        setDay1Low(`L: ${Math.round(data.list[0].main.temp_min)}°`);

        let dayTwo = new Date(data.list[8].dt_txt);
        let dayTwoDay = dayTwo.getDay();
        setDay2(dayNames[dayTwoDay]);
        setDay2Icon(`https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`);
        setDay2High(`H: ${Math.round(data.list[8].main.temp_max)}°`);
        setDay2Low(`L: ${Math.round(data.list[8].main.temp_min)}°`);

        let dayThree = new Date(data.list[16].dt_txt);
        let dayThreeDay = dayThree.getDay();
        setDay3(dayNames[dayThreeDay]);
        setDay3Icon(`https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`);
        setDay3High(`H: ${Math.round(data.list[16].main.temp_max)}°`);
        setDay3Low(`L: ${Math.round(data.list[16].main.temp_min)}°`);

        let dayFour = new Date(data.list[24].dt_txt);
        let dayFourDay = dayFour.getDay();
        setDay4(dayNames[dayFourDay]);
        setDay4Icon(`https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`);
        setDay4High(`H: ${Math.round(data.list[24].main.temp_max)}°`);
        setDay4Low(`L: ${Math.round(data.list[24].main.temp_min)}°`);

        let dayFive = new Date(data.list[32].dt_txt);
        let dayFiveDay = dayFive.getDay();
        setDay5(dayNames[dayFiveDay]);
        setDay5Icon(`https://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@2x.png`);
        setDay5High(`H: ${Math.round(data.list[32].main.temp_max)}°`);
        setDay5Low(`L: ${Math.round(data.list[32].main.temp_min)}°`);
    }

    const getFiveDayGeoWeatherData = async (lat: any, lon: any) => {
        let data = await fiveDayGeoWeatherCall(lat, lon);

        dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let dayOne = new Date(data.list[0].dt_txt);
        let dayOneDay = dayOne.getDay();
        setDay1(dayNames[dayOneDay]);
        setDay1Icon(`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`);
        setDay1High(`H: ${Math.round(data.list[0].main.temp_max)}°`);
        setDay1Low(`L: ${Math.round(data.list[0].main.temp_min)}°`);

        let dayTwo = new Date(data.list[8].dt_txt);
        let dayTwoDay = dayTwo.getDay();
        setDay2(dayNames[dayTwoDay]);
        setDay2Icon(`https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`);
        setDay2High(`H: ${Math.round(data.list[8].main.temp_max)}°`);
        setDay2Low(`L: ${Math.round(data.list[8].main.temp_min)}°`);

        let dayThree = new Date(data.list[16].dt_txt);
        let dayThreeDay = dayThree.getDay();
        setDay3(dayNames[dayThreeDay]);
        setDay3Icon(`https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`);
        setDay3High(`H: ${Math.round(data.list[16].main.temp_max)}°`);
        setDay3Low(`L: ${Math.round(data.list[16].main.temp_min)}°`);

        let dayFour = new Date(data.list[24].dt_txt);
        let dayFourDay = dayFour.getDay();
        setDay4(dayNames[dayFourDay]);
        setDay4Icon(`https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`);
        setDay4High(`H: ${Math.round(data.list[24].main.temp_max)}°`);
        setDay4Low(`L: ${Math.round(data.list[24].main.temp_min)}°`);

        let dayFive = new Date(data.list[32].dt_txt);
        let dayFiveDay = dayFive.getDay();
        setDay5(dayNames[dayFiveDay]);
        setDay5Icon(`https://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@2x.png`);
        setDay5High(`H: ${Math.round(data.list[32].main.temp_max)}°`);
        setDay5Low(`L: ${Math.round(data.list[32].main.temp_min)}°`);
    }


    const handleSearch = async (city: string) => {
        getWeatherData(city);
        getFiveDayWeatherData(city);
    }


    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (geoPosition) => {
                        let lat = geoPosition.coords.latitude;
                        let lon = geoPosition.coords.longitude;
                    },
                    (geoError) => {
                        setError(geoError.message);
                    }
                );
            } else {
                setError('Location services are not enabled.');
            }
        };

        getLocation();
        getGeoWeatherData(lat, lon);
        getFiveDayWeatherData('stockton');

    }, []);

    return (
        <div className=''>

            {/* Search Bar */}
            <div className='pb-14'>
                <div className='flex flex-row gap-3 justify-center items-center searchbarBackground h-20'>
                    <input className='searchInputBackground border-none rounded-lg text-xl h-10' id='search' type="text" placeholder='Search for a city' />
                    <button className='py-2 px-4 h-10 rounded-lg text-xl searchButtonBackground border-none' onClick={handleSearch} >Search</button>
                </div>
            </div>

            {/* Current Weather */}
            <div className="grid grid-cols-5 gap-10 px-10">

                <div className="col-span-5 lg:col-span-3">
                    <div className='divBackground grid grid-cols-1 lg:grid-cols-2 rounded-lg pt-4'>
                        {/* heart button */}
                        <div className='flex order-first lg:col-span-2 justify-end heartIcon pr-7'>
                            <PiHeartStraightDuotone className='icon ml-auto' />
                        </div>

                        <div className='grid justify-center pt-[50px] pb-9'>
                            <h1 className='text-center text-5xl font-normal pb-7'>{cityName}</h1>
                            <p className='text-center text-5xl font-normal pb-8'>{currentWeather}</p>
                            <p className='text-center text-4xl font-normal pb-8'>{currentConditions}</p>
                            <p className='text-center text-4xl font-normal'>{highLow}</p>
                        </div>

                        {/* Current weather icon */}
                        <div className='grid order-first lg:order-last justify-center items-center'>
                            <img className='h-48 w-48' src={icon} alt="Current weather icon" />
                        </div>
                    </div>
                </div>

                {/* Favorites List */}
                <div className="divBackground col-span-5 lg:col-span-2 rounded-lg lg:ml-20">
                    <h1 className='text-center text-[32px] py-2'>Favorites</h1>

                    <hr className='border-black w-4/5 mx-auto' />

                    <div>
                        {/* insert favorites here */}
                    </div>
                </div>
            </div>

            {/* Five Day Forecast */}
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-10 py-10 lg:pt-24 px-10'>
                <div className='divBackground rounded-lg py-4'>
                    <h1 className='text-center text-[32px]'>{day1}</h1>
                    <img className='mx-auto' src={day1Icon} alt="Day 1 weather icon" />
                    <p className='text-center text-xl'>{day1High}</p>
                    <p className='text-center text-xl'>{day1Low}</p>
                </div>
                <div className='divBackground rounded-lg py-4'>
                    <h1 className='text-center text-[32px]'>{day2}</h1>
                    <img className='mx-auto' src={day2Icon} alt="Day 2 weather icon" />
                    <p className='text-center text-xl'>{day2High}</p>
                    <p className='text-center text-xl'>{day2Low}</p>
                </div>
                <div className='divBackground rounded-lg py-4'>
                    <h1 className='text-center text-[32px]'>{day3}</h1>
                    <img className='mx-auto' src={day3Icon} alt="Day 3 weather icon" />
                    <p className='text-center text-xl'>{day3High}</p>
                    <p className='text-center text-xl'>{day3Low}</p>
                </div>
                <div className='divBackground rounded-lg py-4'>
                    <h1 className='text-center text-[32px]'>{day4}</h1>
                    <img className='mx-auto' src={day4Icon} alt="Day 4 weather icon" />
                    <p className='text-center text-xl'>{day4High}</p>
                    <p className='text-center text-xl'>{day4Low}</p>
                </div>
                <div className='divBackground rounded-lg py-4'>
                    <h1 className='text-center text-[32px]'>{day5}</h1>
                    <img className='mx-auto' src={day5Icon} alt="Day 5 weather icon" />
                    <p className='text-center text-xl'>{day5High}</p>
                    <p className='text-center text-xl'>{day5Low}</p>
                </div>
            </div>

        </div>
    )
}

export default WeatherComponent
