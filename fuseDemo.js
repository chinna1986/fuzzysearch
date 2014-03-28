$(function() {
  function start(books) {
    var $inputSearch = $('#inputSearch'),
        $result = $('#results'),

        $authorCheckbox = $('#author'),
        $titleCheckbox = $('#title'),
        $caseCheckbox = $('#case'),
        $resultTemplate = $('#template'),

        searchAuthors = false,
        searchTitles = true,
        isCaseSensitive = false,

        pushToTemp = function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['resulttemplate'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<li class=\"result-item\"> \r\n "
    + escapeExpression(((helper = helpers.title || (depth0 && depth0.title)),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + " \r\n  <span>"
    + escapeExpression(((helper = helpers.author || (depth0 && depth0.author)),(typeof helper === functionType ? helper.call(depth0, {"name":"author","hash":{},"data":data}) : helper)))
    + "</span>\r\n</li>";
},"useData":true});},

        fuse;

    function search() {
      var r = fuse.search($inputSearch.val());
      $result.empty();
      $.each(r, /*function() {
        $result.append('<li class="result-item">' + this.title + ', <span>' + this.author + '</span></li>');
      }*/
      pushToTemp());
    }

    function createFuse() {
      var keys = [];
      if (searchAuthors) {
        keys.push('author');
      }
      if (searchTitles) {
        keys.push('title');
      }
      console.log('fuse keys', keys);
      fuse = new Fuse(books, {
        keys: keys,
        caseSensitive: isCaseSensitive
      });
    }

    function onAuthorCheckboxChanged() {
      searchAuthors= $authorCheckbox.prop('checked');
      createFuse();
      search();
    }

    function onTitleCheckboxChanged() {
      searchTitles = $titleCheckbox.prop('checked');
      createFuse();
      search();
    }

    function onCaseCheckboxChanged() {
      isCaseSensitive = $caseCheckbox.prop('checked');
      createFuse();
      search();
    }

    $authorCheckbox.on('change', onAuthorCheckboxChanged);
    $titleCheckbox.on('change', onTitleCheckboxChanged);
    $caseCheckbox.on('change', onCaseCheckboxChanged);

    $inputSearch.on('keyup', search);

    console.log('about to create fuse');
    createFuse();
  }

  $.getJSON('booklist.json', function(data) {
     start(data);
  });

});