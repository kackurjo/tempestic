import axios, { AxiosResponse } from 'axios';
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


// function parseFMIResponse(xml: any) {
//   const forecast: any[] = [];
//   if (!xml['wfs:FeatureCollection']) {
//     return forecast;
//   }

//   xml['wfs:FeatureCollection']['wfs:member'].forEach((memberElem: any) => {
//     const forecastElem = memberElem['BsWfs:BsWfsElement'][0];
//     const time = forecastElem['BsWfs:Time'][0];
//     let paramName = fmiParamNames[forecastElem['BsWfs:ParameterName'][0].toLowerCase()];
//     const rawParamValue = forecastElem['BsWfs:ParameterValue'][0];
//     const paramValue = rawParamValue;

//     if (paramName === undefined) {
//       paramName = forecastElem['BsWfs:ParameterName'][0].toLowerCase();
//     }
//     const forecastItem = forecast.find((item) => item.time === time);
//     if (forecastItem !== undefined) {
//       forecastItem[paramName] = paramValue;
//     } else {
//       const paramObject = { time };
//       paramObject[paramName] = paramValue;
//       forecast.push(paramObject);
//     }
//   });
//   return forecast;
// }

// async function callFMI({ url, readyHandler }) {
//   const res = await axios.get(url);
//   return new Promise((resolve, reject) => {
//     parseString(res.data, (err, result) => {
//       if (err) {
//         reject(err);
//       }
//       return resolve(readyHandler(result));
//     });
//   });
// }

// async function seaLevelRequest(station: string, startDate: Date, EndDate: Date) {
//   const seaParams = new URLSearchParams();
//   seaParams.append('service', 'WFS');
//   seaParams.append('version', '2.0.0');
//   seaParams.append('request', 'getFeature');
//   seaParams.append('storedquery_id', 'fmi::forecast::sealevel::point::simple');
//   seaParams.append('starttime', startDate.toISOString());
//   seaParams.append('endtime', EndDate.toISOString());
//   seaParams.append('latlon', station);
//   const url = `http://opendata.fmi.fi/wfs?${seaParams.toString()}`;
//   return callFMI({ url, readyHandler: parseFMIResponse });
// }
