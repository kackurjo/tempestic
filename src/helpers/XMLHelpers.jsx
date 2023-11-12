import React, { useEffect } from "react";
import xml2js from "xml2js";

function parseFMIResponse(xml) {
  const forecast = [];
  if (!xml['wfs:FeatureCollection']) {
    return forecast;
  }

  xml['wfs:FeatureCollection']['wfs:member'].forEach((memberElem) => {
    const forecastElem = memberElem['BsWfs:BsWfsElement'][0];
    const time = forecastElem['BsWfs:Time'][0];
    let paramName = fmiParamNames[forecastElem['BsWfs:ParameterName'][0].toLowerCase()];
    const rawParamValue = forecastElem['BsWfs:ParameterValue'][0];
    const paramValue = rawParamValue;

    if (paramName === undefined) {
      paramName = forecastElem['BsWfs:ParameterName'][0].toLowerCase();
    }
    const forecastItem = forecast.find((item) => item.time === time);
    if (forecastItem !== undefined) {
      forecastItem[paramName] = paramValue;
    } else {
      const paramObject = { time };
      paramObject[paramName] = paramValue;
      forecast.push(paramObject);
    }
  });
  return forecast;
}

export default async function callFMI(res) {
  const parser = new xml2js.Parser({ explicitArray: false });
  useEffect(() => {
    parser.parseString(res, function (err, result) {
      console.log(result);
      return result;
    });
  }, [res]);
  // return new Promise((resolve, reject) => {
  //   parser.parseString(res.data, (err, result) => {
  //     if (err) {
  //       reject(err);
  //     }
  //     return resolve(result);
  //   });
  // });
}