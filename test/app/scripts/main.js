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

    var ItemView = Backbone.View.extend({
        tagName: 'li',
        render: function() {
            $(this.el).html('<span class="part1">'+this.model.get('part1') + '</span> <span class="part2">' + this.model.get('part2') + '</span>');
            return this;
        }
    });

    var ListView = Backbone.View.extend({
    	el: $('body'),
        events: {
            'click button#add': 'addItem'
        },
    	initialize: function() {
            this.collection = new List();
            this.collection.bind('add', this.appendItem);
            this.counter = 0;
    		this.render();
    	},
    	render: function () {
            $(this.el).prepend("<button id='add'>Add list item</button>");
    	},
        addItem: function() {
            this.counter++;
            var item = new Item();
            item.set({
                part1: 'first',
                part2: 'second'
            });
            this.collection.add(item);
        },
        appendItem: function(item) {
            // console.log(item.attributes.part1);
            var itemView = new ItemView({
                model: item
            });
            $('ul#items', this.el).append(itemView.render().el);
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
