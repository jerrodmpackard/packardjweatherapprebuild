import Image from "next/image";
import background from '@/app/Assets/sebastien-gabriel--IMlv9Jlb24-unsplash.jpg'
import WeatherComponent from "./Components/WeatherComponent";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className=' absolute inset-0 bg-cover bg-fixed min-h-screen' style={{ backgroundImage: `url(${background.src})`, opacity: '0.7' }}></div>
      
      <div className="relative z-10">
        <WeatherComponent />
      </div>
    </div>
  );
}
