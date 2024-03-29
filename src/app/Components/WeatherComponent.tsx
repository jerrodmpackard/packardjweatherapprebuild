'use client'
import React, { useEffect, useState } from 'react'
import { currentGeoWeatherCall, currentWeatherCall, fiveDayGeoWeatherCall, fiveDayWeatherCall } from '../Utils/DataServices';
import { saveToLocalStorage, getLocalStorage, removeFromLocalStorage } from '../Utils/LocalStorage';
import { PiHeartStraightDuotone, PiSunglasses } from 'react-icons/pi'

const WeatherComponent = () => {

    // Current Weather Use States
    const [userInput, setUserInput] = useState<string>('');
    const [citySearch, setCitySearch] = useState<string>('');
    const [cityName, setCityName] = useState<string>('');
    const [currentWeather, setCurrentWeather] = useState<string>('');
    const [currentConditions, setCurrentConditions] = useState<string>('');
    const [highLow, setHighLow] = useState<string>('');
    const [icon, setIcon] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [searchBool, setSearchBool] = useState<boolean>(false);
    const [heartClass, setHeartClass] = useState<string>('');


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


    // Favorites useState
    const [favorites, setFavorites] = useState<string[]>([]);


    // Coordinates variables
    let lat: number;
    let lon: number;


    // Day Names Array for Five Day Forecast
    let dayNames: string[];


    // Current Weather Fetches
    const getGeoWeatherData = async (lat: any, lon: any) => {
        let data = await currentGeoWeatherCall(lat, lon);
        setCityName(`${data.name}, ${data.sys.country}`);
        setCurrentWeather(`${Math.round(data.main.temp)}° F`);
        setCurrentConditions(`${data.weather[0].description}`);
        setHighLow(`High: ${Math.round(data.main.temp_max)}° Low: ${Math.round(data.main.temp_min)}°`);
        setIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    }


    const getWeatherData = async (citySearch: string) => {
        try {
            let data = await currentWeatherCall(citySearch);
            setCityName(`${data.name}, ${data.sys.country}`);
            setCurrentWeather(`${Math.round(data.main.temp)}° F`);
            setCurrentConditions(`${data.weather[0].description}`);
            setHighLow(`High: ${Math.round(data.main.temp_max)}° Low: ${Math.round(data.main.temp_min)}°`);
            setIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

        } catch (error) {
            alert(`${citySearch} is not a valid city or location. Please try again.`);
        }
    }


    // Five Day Forecast Fetches
    const getFiveDayWeatherData = async (citySearch: string) => {
        try {
            let data = await fiveDayWeatherCall(citySearch);

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

        } catch (error) {

        }
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


    // Handle Search helper function for onClick
    const handleSearch = () => {
        setSearchBool(true);

        if (userInput) {
            setCitySearch(userInput);
        }
        setUserInput('');
    }


    // Geolocation useEffect
    useEffect(() => {
        const getLocation = async () => {
            navigator.geolocation.getCurrentPosition(
                (geoPosition) => {
                    lat = geoPosition.coords.latitude;
                    lon = geoPosition.coords.longitude;

                    setCityName('Locating...');

                    getGeoWeatherData(lat, lon);
                    getFiveDayGeoWeatherData(lat, lon);
                },
                (geoError) => {
                    setError(geoError.message);

                    lat = 37.9577016;
                    lon = -121.2907796;

                    getGeoWeatherData(lat, lon);
                    getFiveDayGeoWeatherData(lat, lon);
                }
            );

            setError('Location services are not enabled.');

        };

        getLocation();
    }, []);


    // Search function useEffect
    useEffect(() => {

        if (searchBool) {
            getWeatherData(citySearch);
            getFiveDayWeatherData(citySearch);
        }

    }, [citySearch]);


    // Favorites helper function
    const handleFavorite = () => {
        const favoritesList = getLocalStorage();

        if (favoritesList.includes(cityName)) {
            removeFromLocalStorage(cityName);
            setHeartClass('icon ');
        } else {
            saveToLocalStorage(cityName)
            setHeartClass('iconFill ');
        }

        setFavorites(favoritesList);
    }


    // Favorites useEffect
    useEffect(() => {
        const favorites = getLocalStorage();

        setFavorites(favorites);

    }, [cityName, heartClass]);


    // Remove Favorites helper function
    const handleRemoveFavorite = (removeCity: string) => {
        removeFromLocalStorage(removeCity);

        const favorites = getLocalStorage();

        setFavorites(favorites);
    }


    // Remove Favorites useEffect
    useEffect(() => {

        if (favorites.includes(cityName)) {
            setHeartClass('iconFill ');
        } else {
            setHeartClass('icon ');
        }

    }, [favorites]);


    // Search from favorites helper function
    const handleSearchFromFavorites = (favoriteCity: string) => {
        getWeatherData(favoriteCity);
        getFiveDayWeatherData(favoriteCity);
    }

    return (
        <div className=''>

            {/* Search Bar */}
            <div className='pb-6 lg:pb-14'>
                {/* Dekstop Search Bar */}
                <div className='lg:flex flex-row items-center justify-between px-4 searchbarBackground h-20 hidden'>
                    <div className='flex flex-row items-center gap-10'>
                        <PiSunglasses className='h-[50px] w-[50px]' />
                        <h1 className='pacifico text-3xl'>Sunny Weather</h1>
                    </div>

                    <div className='flex flex-row items-center gap-3'>
                        <input value={userInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)} className='searchInputBackground border-none rounded-lg text-xl h-10' type="text" placeholder='Search for a city' />
                        <button onClick={handleSearch} className='py-2 px-4 h-10 rounded-lg text-xl searchButtonBackground border-none'  >Search</button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className='flex flex-row gap-3 justify-center items-center searchbarBackground h-20 lg:hidden'>
                    <PiSunglasses className='h-[50px] w-[50px]' />
                    <input value={userInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)} className='searchInputBackground border-none rounded-lg text-xl h-10' type="text" placeholder='Search for a city' />
                    <button onClick={handleSearch} className='py-2 px-4 h-10 rounded-lg text-xl searchButtonBackground border-none'  >Search</button>
                </div>
            </div>

            {/* Current Weather */}
            <div className="grid grid-cols-5 gap-10 px-6 lg:px-10">

                <div className="col-span-5 lg:col-span-3">
                    <div className='divBackground grid grid-cols-1 lg:grid-cols-2 rounded-lg pt-4'>
                        {/* heart button */}
                        <div className='flex order-first lg:col-span-2 justify-end heartIcon pr-7'>
                            <PiHeartStraightDuotone className={heartClass + ' ml-auto cursor-pointer'} onClick={handleFavorite} />
                        </div>

                        <div className='grid justify-center px-4 pb-9'>
                            <h1 className='text-center pacifico text-4xl lg:text-5xl font-normal mb-10'>{cityName}</h1>
                            <p className='text-center text-4xl lg:text-5xl font-normal mb-10'>{currentWeather}</p>
                            <p className='text-center text-3xl lg:text-4xl font-normal mb-10'>{currentConditions}</p>
                            <p className='text-center text-3xl lg:text-4xl font-normal'>{highLow}</p>
                        </div>

                        {/* Current weather icon */}
                        <div className='grid order-first lg:order-last justify-center items-center'>
                            <img className='h-48 w-48' src={icon} alt="Current weather icon" />
                        </div>
                    </div>
                </div>

                {/* Favorites List */}
                <div className="divBackground col-span-5 lg:col-span-2 rounded-lg lg:ml-20 max-h-[383px] overflow-y-auto">
                    <h1 className='text-center pacifico text-3xl lg:text-[32px] py-2'>Favorites</h1>

                    <hr className='border-black w-4/5 mx-auto' />

                    <div className='px-5 py-3 '>
                        {favorites.map((city, idx) => {
                            return (
                                <div key={idx} className='flex flex-row items-center gap-4'>
                                    <PiHeartStraightDuotone className='iconFill cursor-pointer' onClick={() => handleRemoveFavorite(city)} />
                                    <p className='text-3xl cursor-pointer pb-2' onClick={() => handleSearchFromFavorites(city)}>{city}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Five Day Forecast */}
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-10 py-10 lg:pt-24 px-6 lg:px-10'>
                <div className='divBackground rounded-lg py-4'>
                    <h1 className='text-center pacifico text-[32px]'>{day1}</h1>
                    <img className='mx-auto pb-4' src={day1Icon} alt="Day 1 weather icon" />
                    <p className='text-center text-xl pb-4'>{day1High}</p>
                    <p className='text-center text-xl'>{day1Low}</p>
                </div>
                <div className='divBackground rounded-lg py-4'>
                    <h1 className='text-center pacifico text-[32px]'>{day2}</h1>
                    <img className='mx-auto pb-4' src={day2Icon} alt="Day 2 weather icon" />
                    <p className='text-center text-xl pb-4'>{day2High}</p>
                    <p className='text-center text-xl'>{day2Low}</p>
                </div>
                <div className='divBackground rounded-lg py-4'>
                    <h1 className='text-center pacifico text-[32px]'>{day3}</h1>
                    <img className='mx-auto pb-4' src={day3Icon} alt="Day 3 weather icon" />
                    <p className='text-center text-xl pb-4'>{day3High}</p>
                    <p className='text-center text-xl'>{day3Low}</p>
                </div>
                <div className='divBackground rounded-lg py-4'>
                    <h1 className='text-center pacifico text-[32px]'>{day4}</h1>
                    <img className='mx-auto pb-4' src={day4Icon} alt="Day 4 weather icon" />
                    <p className='text-center text-xl pb-4'>{day4High}</p>
                    <p className='text-center text-xl'>{day4Low}</p>
                </div>
                <div className='divBackground rounded-lg py-4'>
                    <h1 className='text-center pacifico text-[32px]'>{day5}</h1>
                    <img className='mx-auto pb-4' src={day5Icon} alt="Day 5 weather icon" />
                    <p className='text-center text-xl pb-4'>{day5High}</p>
                    <p className='text-center text-xl'>{day5Low}</p>
                </div>
            </div>

        </div>
    )
}

export default WeatherComponent
