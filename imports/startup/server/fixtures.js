import { Meteor } from 'meteor/meteor';
import { Usgs } from '../../api/usgs/usgs.js'
import { Fibers } from 'fibers';

var Fiber = Npm.require('fibers');
const allRivers = Usgs.find({});


Meteor.startup(() => {
	allRivers.forEach((river) => {
		//usgsCall(river.river_name);
		//weatherCall(river.river_name);
	});
});

setInterval(function() {
	Fiber(function () {
	allRivers.forEach((river) => {usgsCall(river.river_name);});
		}).run();
}, 1500000);

function usgsCall(riverName){
	var siteObject;
	Fiber(function () {
		siteObject = Usgs.findOne({river_name: riverName});
		Meteor.call('usgs.getCfs', siteObject.site_id, (error, res) => {
	      if (error) {
	        console.log(error);
	      } else {
	      	Usgs.update(
	      		{ river_name: riverName},
    			{ $set: { lastCfs: siteObject.currentCfs }},
    			{ $set: { lastFeet: siteObject.currentFeet }}
	    	);
	      	Usgs.update(
	      		{ river_name: riverName},
    			{ $set: { currentCfs: res.cfs }},
    			{ $set: { currentFeet: res.feet }}
	    	);
	      }
	    });

	}).run();
}

function weatherCall(riverName){
	var siteObject;
	Fiber(function () {
		siteObject = Usgs.findOne({river_name: riverName});
		Meteor.call('usgs.getWeather', siteObject.lat, siteObject.lon, (error, res) => {
	      if (error) {
	        console.log(error);
	      } else {
	      	Usgs.update(
	      		{ river_name: riverName},
    			{ $set: { weather: res }}
	    	);
	      }
	    });

	}).run();
}
