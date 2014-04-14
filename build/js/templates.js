this["fuzzySearch"] = this["fuzzySearch"] || {};
this["fuzzySearch"]["templates"] = this["fuzzySearch"]["templates"] || {};

this["fuzzySearch"]["templates"]["body"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"container\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-4 col-md-offset-4\">\r\n\r\n      <div class=\"title\">Fuzzy Search Demo</div>\r\n\r\n        <div class=\"buttons\">\r\n          <button class=\"show-list-button show-hide on btn btn-primary\" type=\"button\">Show List</button>\r\n          <button class=\"show-list-button edit btn btn-default\" type=\"button\">Edit</button>\r\n          <button class=\"edit-mode-button save btn btn-success\" type=\"button\">Save</button>\r\n          <button class=\"edit-mode-button cancel btn btn-danger\" type=\"button\">Cancel</button>\r\n        </div>\r\n\r\n        <div id=\"list-div\">\r\n          <ul id=\"show-list\">\r\n          </ul>\r\n        </div>\r\n\r\n        <div class=\"form-group\">\r\n          <input id=\"inputSearch\" class=\"form-control\" placeholder=\"Search\"></input>\r\n          <p class=\"filter-by\">Filter by:</p>\r\n          <div class=\"checkboxes\"></div>\r\n        </div>\r\n\r\n        <div class=\"fixed-buttons\">\r\n          <button class=\"btn btn-info btn-search-option\" id=\"all-on\">Select All Filters</button>\r\n          <button class=\"btn btn-info btn-search-option\" id=\"all-off\">Unselect All Filters</button>\r\n          <button class=\"btn btn-info btn-search-option\" id=\"case\">Enable Case Sensitivity</button>\r\n        </div>\r\n\r\n        <div id=\"result-div\">\r\n          <div class=\"search-result-title\"><p>Search Results:</p></div>\r\n          <ul id=\"results\">\r\n          </ul>\r\n        </div>\r\n    </div>\r\n  </div>\r\n</div>";
  });

this["fuzzySearch"]["templates"]["checkbox"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n    <span class=\"checkbox-span\">\r\n    	<input data-filter=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" class=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "-checkbox filter-checkbox\" type=\"checkbox\"><span>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</span>\r\n    	</input>\r\n    </span>\r\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["fuzzySearch"]["templates"]["entirelist"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n    <li class=\"result-item\">\r\n        ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \r\n    </li>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        	<span>"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ": "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</span>\r\n            <br>\r\n        ";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.objects, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;
  });

this["fuzzySearch"]["templates"]["searchresults"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	<li class=\"search-result-item\"> \r\n    	";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \r\n    </li>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        	<span>"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ": "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</span>\r\n            <br>\r\n        ";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.results, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;
  });