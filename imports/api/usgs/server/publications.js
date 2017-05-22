 import { Meteor } from 'meteor/meteor';
import { Usgs } from '../usgs.js';

Meteor.publish('usgs.all', function () {
	return Usgs.find();
});
