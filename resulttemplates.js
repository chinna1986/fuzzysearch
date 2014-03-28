var pushToTemp = function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['resulttemplate'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<ul id=\"results\">\r\n	<li class=\"result-item\"> \r\n		"
    + escapeExpression(((helper = helpers.title || (depth0 && depth0.title)),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + " \r\n		<span>"
    + escapeExpression(((helper = helpers.author || (depth0 && depth0.author)),(typeof helper === functionType ? helper.call(depth0, {"name":"author","hash":{},"data":data}) : helper)))
    + "</span>\r\n	</li>\r\n</ul>";
},"useData":true});
}