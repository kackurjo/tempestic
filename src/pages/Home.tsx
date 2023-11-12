import { Dispatch, SetStateAction } from 'react';
import Style from './Home.module.css';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { weather } from '../types';

interface PropsInterface {
  weatherToday: weather[] | undefined;
  weekWeather: weather[] | undefined;
  selectedHour: number;
  setSelectedHour: Dispatch<SetStateAction<number>>;
  setSelectedDay: Dispatch<SetStateAction<number>>;
  selectedDay: number;
  confHours: (date: string) => string;
  confDate: (date: string) => string;
  updateWeather: (date: string) => void;
  place: string;
}

export default function Home(props: PropsInterface) {
  const {
    weatherToday,
    weekWeather,
    selectedHour,
    setSelectedHour,
    selectedDay,
    setSelectedDay,
    confHours,
    confDate,
    updateWeather,
    place
  } = props;

  return (
    <>
      {(weatherToday && weekWeather) && (
        <>
          <div className={Style.topWrapper}>
            <div className={Style.topLeft}>
              <img
                className={Style.weatherIcon}
                alt={weatherToday[selectedHour].smartsymboltext}
                src={`/symbols/${weatherToday[selectedHour].smartsymbol}.svg`}
              />
            </div>
            <div className={Style.topRight}>
              <h1 className={Style.celsiusText}>Weather in {place}</h1>
              <h1 className={Style.celsiusText}>{weatherToday[selectedHour].smartsymboltext}</h1>
              <h1 className={Style.celsiusText}>{weatherToday[selectedHour].temperature}°C</h1>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                <p>Wind Speed</p>
                <p>{weatherToday[selectedHour].windspeedms}m/s</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '80%' }}>
                <p>Wind Direction</p>
                <ArrowUpwardIcon
                  sx={{
                    transform: `rotate(${weatherToday[selectedHour].WindDirection}deg)`
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                <p>Humidity</p>
                <p>{weatherToday[selectedHour].Humidity}</p>
              </div>
            </div>
          </div>
          <div className={Style.hourWrapper}>
            {weatherToday.map((val, idx) => (
              <div
                className={Style.hourDiv}
                style={(idx === selectedHour) ? { backgroundColor: '#00000010' } : { backgroundColor: '#00000060' }}
                onClick={() => setSelectedHour(idx)}
              >
                <p style={{ margin: 0 }}>{confHours(val.time)}</p>
                <img
                  className={Style.hourWeatherIcon}
                  alt={val.smartsymboltext}
                  src={`/symbols/${val.smartsymbol}.svg`}
                />
                <p style={{ margin: 0 }}>{val.temperature}°C</p>
              </div>
            ))}
          </div>
          <div className={Style.botWrapper}>
            {weekWeather.map((val, idx) => (
              <div
                className={Style.dateDiv}
                style={(idx === selectedDay) ? { backgroundColor: '#00000010' } : { backgroundColor: '#00000060' }}
                onClick={() => {
                  updateWeather(val.time);
                  setSelectedDay(idx);
                }}
              >
                <img
                  className={Style.botWeatherIcon}
                  alt={val.smartsymboltext}
                  src={`/symbols/${val.smartsymbol}.svg`}
                />
                <p>{confDate(val.time)}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
