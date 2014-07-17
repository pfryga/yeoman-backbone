/*global require*/
'use strict';

require.config({
    shim: {
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash'
    }
});

require([
    'backbone',
    'jquery'
], function (Backbone, $) {
	// console.log(1);
    var ListView = Backbone.View.extend({
    	el: $('body'),
    	initialize: function() {
    		this.render();
    	},
    	render: function () {
    		$(this.el).append("hello world!");
    	}
    });

    var listView = new ListView();
});
