import { Usgs } from '/imports/api/usgs/usgs.js';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import './cfs.html';

Template.cfs.onCreated(function () {
  Meteor.subscribe('usgs.all');


});

Template.cfs.helpers({
  usgs() {
  	var Query = [{class: "VI"}];
  	Session.set("Query", Query);
    return Usgs.find({$or: Session.get("Query")});
  },
  cfs(riverName) {
  	var siteObject = Usgs.findOne({river_name: riverName});
  	var val = siteObject.river_name + " -cfs";
  	if(siteObject){
	   	Meteor.call('usgs.getCfs', siteObject.site_id, (error, res) => {
	      if (error) {
	        console.log(error);
	      } else {
	      	Session.set(val, res.cfs);
	      }
	    });
  	}   
    return Session.get(val); 
  },
  feet(riverName) {
  	var siteObject = Usgs.findOne({river_name: riverName});
  	var val = siteObject.river_name + " -feet";
  	if(siteObject){
	   	Meteor.call('usgs.getCfs', siteObject.site_id, (error, res) => {
	      if (error) {
	        console.log(error);
	      } else {
	      	Session.set(val, res.feet);
	      }
	    });
  	}   
    return Session.get(val); 
  },

});

Template.cfs.events({
  'click button'(event, instance) {
    if($("#" + event.currentTarget.id).is(".active")){
    	$("#" + event.currentTarget.id).removeClass("active");
    } else if($("#" + event.currentTarget.id).not(".active")){
    	$("#" + event.currentTarget.id).addClass("active");
       var query2 = Session.get("Query");
       query2.push({class: event.currentTarget.id})
      //console.log(event.currentTarget.id + " : " + query2);
      console.log(Session.get("Query"));
      Session.set("Query", query2);
    	console.log(Session.get("Query"));
    }
  },

});
