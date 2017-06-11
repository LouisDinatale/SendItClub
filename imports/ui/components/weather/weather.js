import './weather.html';
import { Usgs } from '/imports/api/usgs/usgs.js';

Template.weather.onCreated(function () {
	Meteor.subscribe('usgs.all');
});

Template.weather.helpers({
	allWeather(){
		if(Session.get("SelectedRiver") != "Default"){
			var content = Usgs.findOne({river_name: Session.get("SelectedRiver")});
			return content.weather;
		}
	},
	sum(day){
		if(Session.get("SelectedRiver") != "Default"){
			var content = Usgs.findOne({river_name: Session.get("SelectedRiver")});
			return content.weather[day].sum;
		}else{
			return "Default";
		}
	},
	temp(day){
		if(Session.get("SelectedRiver") != "Default"){
			var content = Usgs.findOne({river_name: Session.get("SelectedRiver")});
			return content.weather[day].temp;
		}else{
			return "Default";
		}
	},
	max(day){
		if(Session.get("SelectedRiver") != "Default"){
			var content = Usgs.findOne({river_name: Session.get("SelectedRiver")});
			return content.weather[day].max;
		}else{
			return "Default";
		}
	},
	min(day){
		if(Session.get("SelectedRiver") != "Default"){
			var content = Usgs.findOne({river_name: Session.get("SelectedRiver")});
			return content.weather[day].min;
		}else{
			return "Default";
		}
	}
});

Template.weather.events({

});