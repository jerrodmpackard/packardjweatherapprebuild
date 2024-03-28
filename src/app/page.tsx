import Image from "next/image";
import background from '@/app/Assets/sebastien-gabriel--IMlv9Jlb24-unsplash.jpg'
import WeatherComponent from "./Components/WeatherComponent";

export default function Home() {
  return (
    <div className='bg-cover bg-fixed h-full' style={{ backgroundImage: `url(${background})` }}>
      <WeatherComponent />
    </div>
  );
}
