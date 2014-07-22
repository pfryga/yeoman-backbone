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

    var Item = Backbone.Model.extend({
        defaults: {
            part1: 'hello',
            part2: 'world'
        }
    });

    var List = Backbone.Collection.extend({
        model: Item
    });

    var ListView = Backbone.View.extend({
    	el: $('body'),
        events: {
            'click button#add': 'addItem'
        },
    	initialize: function() {
            this.counter = 0;
    		this.render();
    	},
    	render: function () {
            $(this.el).append("<button id='add'>Add list item</button>");
    		$(this.el).append("<ul id=\"items\"></ul>");
    	},
        addItem: function() {
            this.counter++;
            $('ul#items', this.el).append("<li>hello world " + this.counter + "</li>");
        },
        appendItem: function(item){
            $('ul#items', this.el).append("<li>" + item.get('part1') + " " + item.get('part2') + "</li>");
        }
    });

    // var ob = {
    //     super: $('#test'),
    //     makeSth: function() {
    //         $('#test').html('append!');
    //         this.super.html('append2');
    //         console.log(this.super.html());
    //     }
    // };

    // ob.makeSth();
    
    var listView = new ListView();
});
