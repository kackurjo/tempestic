import axios from 'axios';
import { weather } from '../types';

export async function getWeathertoday(
  place: string,
  endDate: Date,
  returnValues = 'smartsymbol,smartsymboltext,time,temperature,windspeedms,WindDirection,Humidity'
): Promise<weather[]> {
  try {
    const startDate = new Date(endDate);
    startDate.setHours(0, 0, 0);
    const weatherParams = new URLSearchParams();
    weatherParams.append('place', place);
    weatherParams.append('param', returnValues);
    weatherParams.append('lang', 'en');
    weatherParams.append('format', 'json');
    weatherParams.append('starttime', startDate.toISOString());
    weatherParams.append('endtime', endDate.toISOString());
    const res = await axios.get(`https://opendata.fmi.fi/timeseries?${weatherParams.toString()}`);
    console.log(`https://opendata.fmi.fi/timeseries?${weatherParams.toString()}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.statusText);
  }
}

export async function getWeekWeather(
  place: string,
  returnValues = 'smartsymbol,smartsymboltext,time,temperature,windspeedms,WindDirection,Humidity'
): Promise<weather[]> {
  try {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    const weatherParams = new URLSearchParams();
    weatherParams.append('place', place);
    weatherParams.append('param', returnValues);
    weatherParams.append('lang', 'en');
    weatherParams.append('format', 'json');
    weatherParams.append('endTime', endDate.toISOString());
    weatherParams.append('timestep', '1440');
    const res = await axios.get(`https://opendata.fmi.fi/timeseries?${weatherParams.toString()}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.statusText);
  }
}
