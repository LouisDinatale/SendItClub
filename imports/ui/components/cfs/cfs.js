import { Usgs } from '/imports/api/usgs/usgs.js';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import './cfs.html';

Template.cfs.onCreated(function () {
  Meteor.subscribe('usgs.all');
  Session.set("Query", [{class: "VI"}]);
  Session.set("SelectedRiver", "Default");

});

Template.cfs.helpers({
  usgs() {
    return Usgs.find({$or: Session.get("Query")});
  },
  cfs(riverName) {
  	var siteObject = Usgs.findOne({river_name: riverName});
    var val = siteObject.river_name + " -cfs";
    Session.set(val, siteObject.currentCfs);
    return Session.get(val); 
  },
  feet(riverName) {
  	var siteObject = Usgs.findOne({river_name: riverName});
  	var val = siteObject.river_name + " -feet";
     Session.set(val, siteObject.currentFeet);
    return Session.get(val);
    } 
});

Template.cfs.events({
  'click button'(event, instance) {
    var queryPlaceHolder = {};
    var selector = '';
    if($("#" + event.currentTarget.id).is(".active")){
    	$("#" + event.currentTarget.id).removeClass("active");
        queryPlaceHolder = Session.get("Query");
        for(var i = 0; i < queryPlaceHolder.length; i++){
          if(queryPlaceHolder[i].class === event.currentTarget.id){
            queryPlaceHolder.splice(i,1);
          }
        }
        Session.set("Query", queryPlaceHolder);
        Session.set("SelectedRiver", "Default");
    } else if($("#" + event.currentTarget.id).not(".active")){
    	$("#" + event.currentTarget.id).addClass("active");
        queryPlaceHolder = Session.get("Query");
        queryPlaceHolder.push({class: event.currentTarget.id});
        Session.set("Query", queryPlaceHolder);
    }
  },
  'click .riverInfo': function(e) {
    if($(e.currentTarget).hasClass('highlight')){
      $(e.currentTarget).removeClass('highlight');
    }
    else if(!$(e.currentTarget).hasClass('highlight')){
      $('.riverInfo').removeClass('highlight');
      $(e.currentTarget).addClass('highlight');
    }
    if(Session.get("SelectedRiver") === e.currentTarget.id){
      Session.set("SelectedRiver", "Default");
    }else{
      Session.set("SelectedRiver", e.currentTarget.id);
    }
  }
});
