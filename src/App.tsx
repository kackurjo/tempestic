import parse from 'date-fns/parse';
import { useEffect, useState } from 'react';
import {
  Route,
  Routes
} from 'react-router-dom';
import { getWeathertoday, getWeekWeather } from './helpers/Requests';
import { weather } from './types';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';

// green: #87CEEB
// oceanblue: #6b92bb
// pink: #bb6bba
// tempestic-skin: #bb946c

export default function App() {
  const [place, setPlace] = useState<string>('helsinki');
  const [weatherToday, setWeatherToday] = useState<weather[] | undefined>();
  const [weekWeather, setWeekWeather] = useState<weather[] | undefined>();
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number>(0);

  const fetchWeather = async () => {
    const endDate = new Date();
    endDate.setHours(23, 59, 59);
    setWeatherToday(await getWeathertoday(place, endDate));
    setWeekWeather(await getWeekWeather(place));
  }

  const confHours = (date: string) => {
    const newDate = parse(date, "yyyyMMdd'T'HHmmss", new Date());
    return `${newDate.getHours()}:00`;
  }

  const confDate = (date: string) => {
    const newDate = parse(date, "yyyyMMdd'T'HHmmss", new Date());
    return `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`;
  }

  const updateTodayWeather = async (date: string) => {
    const endDate = parse(date, "yyyyMMdd'T'HHmmss", new Date());
    endDate.setHours(23, 59, 59);
    setWeatherToday(undefined);
    setWeatherToday(await getWeathertoday(place, endDate));
  }

  const updateWeather = async () => {
    setSelectedHour(0);
    setSelectedDay(0);
    setWeatherToday(undefined);
    setWeekWeather(undefined);
    const endDate = new Date();
    endDate.setHours(23, 59, 59);
    setWeatherToday(await getWeathertoday(place, endDate));
    setWeekWeather(await getWeekWeather(place));
  }

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <>
      <Navbar setPlace={setPlace} place={place} updateWeather={updateWeather} />
      <div>
        <Routes>
          <Route path='/' element={
            <Home
              weatherToday={ weatherToday }
              weekWeather={ weekWeather }
              selectedHour={ selectedHour }
              setSelectedHour={ setSelectedHour }
              selectedDay={ selectedDay }
              setSelectedDay={ setSelectedDay }
              confHours={ confHours }
              confDate={ confDate }
              updateWeather={ updateTodayWeather }
              place={place}
            />} />
        </Routes>
      </div>
    </>
  )
}
