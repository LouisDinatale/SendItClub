// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Links } from '../links.js';
import { UsgsData } from '../usgsData.js'


Meteor.publish('links.all', function () {
	return Links.find();
});

Meteor.publish('usgs', function () {
	return UsgsData.find();
});