import Image from "next/image";
import SearchbarComponent from "./Components/SearchbarComponent";
import CurrentWeatherComponent from "./Components/CurrentWeatherComponent";
import background from '@/app/Assets/sebastien-gabriel--IMlv9Jlb24-unsplash.jpg'
import FavoritesComponent from "./Components/FavoritesComponent";

export default function Home() {
  return (
    <div className='bg-cover bg-fixed h-full' style={{ backgroundImage: `url(${background})` }}>
      <SearchbarComponent />

      <div className="grid grid-cols-5">
        <div className="col-span-3">
          <CurrentWeatherComponent />
        </div>

        <div className="col-span-2">
          <FavoritesComponent />
        </div>
      </div>

    </div>
  );
}
