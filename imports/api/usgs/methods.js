import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Usgs } from './usgs.js';
import { Http } from 'meteor/http';

Meteor.methods({
  'usgs.getCfs'(usgsCode) {
  check(usgsCode, String);

  var result = HTTP.get("http:\/\/waterservices.usgs.gov/nwis/iv/?format=json&sites=" + usgsCode, {});
  try {
    var obj = JSON.parse(result.content);
    obj = obj.value.timeSeries;
    for (var key in obj){
      if (obj.hasOwnProperty(key))
      {
        if(obj[key].variable.unit.unitCode === "ft3/s"){
          var cfs = obj[key].values[0].value[0].value;
        }
        if(obj[key].variable.unit.unitCode === "ft"){
          var feet = obj[key].values[0].value[0].value;
        }
      }
    }
	} catch (ex) {
  		console.error(ex);
	}
  var riverInfo = {
    "cfs" : cfs,
    "feet" : feet
  };

	return riverInfo;
  },
  'usgs.getWeather'(lat, lon) {
    check(lat, String);
    check(lon, String);
    var result = HTTP.get("https:\/\/api.darksky.net/forecast/3cd7f09e8fea282f0ee69dec8a8190d8/" + lat + "," + lon);
    try {
      var obj = JSON.parse(result.content);
      var weatherList = [{"sum" : obj.currently.summary,"temp" : obj.currently.temperature,}];
      for(var i = 0; i < 7; i++){
        weatherList.push({
          "sum" : obj.daily.data[i].summary,
          "min" : obj.daily.data[i].temperatureMin,
          "max" : obj.daily.data[i].temperatureMax
        });
      }
  } catch (ex) {
      console.error(ex);
  }
    return weatherList;
  },
});