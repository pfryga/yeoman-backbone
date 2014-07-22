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
        events: {
            'click span.swap': 'swap',
            'click span.remove': 'remove'
        },
        initialize: function() {
            _.bindAll(this, 'render', 'unrender', 'swap', 'remove'); // every function that uses 'this' as the current object should be in here

            this.model.bind('change', this.render);
            this.model.bind('remove', this.unrender);
        },
        render: function() {
            $(this.el).html('<span class="part1">' + this.model.get('part1') + '</span> <span class="part2">' + this.model.get('part2') + '</span> <span class="swap">swap</span> <span class="remove">[-]</span>');
            return this;
        },
        swap: function() {
            var swapped = {
                part1: this.model.get('part2'),
                part2: this.model.get('part1')
            }
            this.model.set(swapped);
        },
        remove: function(){
            this.model.destroy();
        },
        unrender: function(){
            $(this.el).remove();
        }
    });

    var ListView = Backbone.View.extend({
    	el: $('body'),
        events: {
            'click button#add': 'addItem'
        },
    	initialize: function() {
            _.bindAll(this, 'render', 'addItem', 'appendItem', 'countModels');
            this.collection = new List();
            this.collection.bind('add', this.appendItem);
            this.collection.bind('add', this.countModels);
            this.collection.bind('remove', this.countModels);
            this.counter = 0;
    		this.render();
    	},
    	render: function () {
            $(this.el).prepend("<button id='add'>Add list item</button>");
            $(this.el).prepend("<div id=\"counter\" style=\"float: right\">Collection length: <span></span></div>");
            this.countModels();
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
        }, 
        countModels: function() {
            $('#counter span').html(this.collection.length);
        }
    });
    
    var listView = new ListView();
    
});
