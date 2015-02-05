window.Stem={Models:{},Collections:{},Views:{},Routers:{},config:{donorsChooseApiKey:"DONORSCHOOSE"},init:function(){"use strict";var a=new Stem.Collections.Proposals([],{maxSize:4});a.fetch({reset:!0});var b=new Stem.Views.ProposalsAsHighlights({collection:a});b.render(),$("#crowdfunding").append(b.el)}},$(document).ready(function(){"use strict";Stem.init()}),this.JST=this.JST||{},this.JST["app/scripts/templates/proposalAsHighlight.ejs"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+='<img src="'+(null==(__t=imageURL)?"":__t)+'" class="img-responsive">\n<h3>'+(null==(__t=title)?"":__t)+"</h3>\n<p>"+(null==(__t=shortDescription)?"":__t)+"</p>\n";return __p},this.JST["app/scripts/templates/proposalsAsHighlights.ejs"]=function(obj){obj||(obj={});{var __p="";_.escape}with(obj)__p+="\n";return __p},Stem.Models=Stem.Models||{},function(){"use strict";Stem.Models.Proposal=Backbone.Model.extend({sync:function(a,b,c){if("read"!==a)throw"Attempt to write read-only Proposal model";return c.dataType="jsonp",Backbone.sync(a,b,c)},url:function(){return"http://api.donorschoose.org/common/json_feed.html?APIKey="+Stem.config.donorsChooseApiKey+"&id="+this.get("id")},initialize:function(){},defaults:{},validate:function(a){return _(a.title).isString()?_(a.imageURL).isString()?_(a.shortDescription).isString()?_(a.schoolName).isString()?_(a.city).isString()?void 0:"Proposal doesn't have a valid city":"Proposal doesn't have a valid school":"Proposal doesn't have a valid description":"Proposal doesn't have a valid thumbnail image":"Proposal doesn't have a valid title"},parse:function(a){return a.proposals&&_(a.proposals).isArray()?a.proposals[0]:a}})}(),Stem.Collections=Stem.Collections||{},function(){"use strict";Stem.Collections.Proposals=Backbone.Collection.extend({model:Stem.Models.Proposal,initialize:function(a,b){var c=b||{};this.options={};var d={"Health & Life Science":"4","Applied Science":"6","Environmental Science":"7",Mathematics:"8"};this.options.subject=c.subject&&d[c.subject]?d[c.subject]:"-4";var e={primary:"1",elementary:"2",middle:"3",high:"4",adult:"5"};c.grade&&e[c.grade]&&(this.options.grade=e[c.grade]);var f={urgency:"0",poverty:"1",cost:"2",popularity:"4",expiration:"5",newest:"7"};c.sortBy&&f[c.sortBy]&&(this.options.sortBy=f[c.sortBy]),this.options.maxSize=c.maxSize,this.options.keywords=c.keywords},sync:function(a,b,c){if("read"!==a)throw"Attempt to write read-only Proposals collection";return c.dataType="jsonp",Backbone.sync(a,b,c)},url:function(){return"http://api.donorschoose.org/common/json_feed.html?APIKey="+Stem.config.donorsChooseApiKey+"&state=GA&subject4="+this.options.subject+(this.options.grade?"&gradeType="+this.options.grade:"")+(this.options.keywords?'&keywords="'+encodeURIComponent(this.options.keywords)+'"':"")+(this.options.maxSize?"&max="+this.options.maxSize:"")+(this.options.sortBy?"&sortBy="+this.options.sortBy:"")},parse:function(a){return a.proposals}})}(),Stem.Views=Stem.Views||{},function(){"use strict";Stem.Views.ProposalAsHighlight=Backbone.View.extend({template:JST["app/scripts/templates/proposalAsHighlight.ejs"],tagName:"div",id:"",className:"",events:{},render:function(){return this.$el.html(this.template(this.model.toJSON())),this}})}(),Stem.Views=Stem.Views||{},function(){"use strict";Stem.Views.ProposalsAsHighlights=Backbone.View.extend({template:JST["app/scripts/templates/proposalsAsHighlights.ejs"],tagName:"div",id:"",className:"container",events:{},initialize:function(){this.listenTo(this.collection,"reset",this.render)},render:function(){return this.$el.html(this.template()),this.collection.each(function(a,b){b%4===0&&$("<div>").addClass("row").appendTo(this.$el);var c=new Stem.Views.ProposalAsHighlight({model:a,el:$("<div>").addClass("col-sm-3").get(0)}).render();this.$(".row").last().append(c.el)},this),this}})}();