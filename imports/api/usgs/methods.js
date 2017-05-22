import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Usgs } from './usgs.js';
import { Http } from 'meteor/http';

Meteor.methods({
  'usgs.getCfs'(usgsCode) {
  check(usgsCode, String);

  var result = HTTP.get("http:/"+"/waterservices.usgs.gov/nwis/iv/?format=json&sites=" + usgsCode, {});
  try {
		var obj = JSON.parse(result.content); 
		var cfs = obj.value.timeSeries[0].values[0].value[0].value;
    var feet = obj.value.timeSeries[1].values[0].value[0].value;

	} catch (ex) {
  		console.error(ex);
	}
  var riverInfo = {
    "cfs" : cfs,
    "feet" : feet
  };

	return riverInfo;
  },
});