import './content.html';
import { Usgs } from '/imports/api/usgs/usgs.js';
import { Http } from 'meteor/http'; 

Template.content.onCreated(function () {
	Meteor.subscribe('usgs.all');
});

Template.content.helpers({
	header(){
		console.log(Session.get("SelectedRiver"));
		if(Session.get("SelectedRiver") != "Default"){
			var head = Usgs.findOne({river_name: Session.get("SelectedRiver")});
			return head.river_name;
		}else{
			return "Default";
		}
	}
});

Template.content.events({

});