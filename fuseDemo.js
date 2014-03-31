$(function() {
  function start(books) {
    console.log("starting start()..");
    var $inputSearch = $('#inputSearch'),
        $result = $('#results'),

        $authorCheckbox = $('#author'),
        $titleCheckbox = $('#title'),
        $caseCheckbox = $('#case'),

        searchAuthors = false,
        searchTitles = true,
        isCaseSensitive = false,

        fuse;

    function search() {
      var r = fuse.search($inputSearch.val());
      console.log("template", $('#result-template').html());
      var template = Handlebars.compile($('#result-template').html());

      $result.empty();
      
      for(var i = 0; i < r.length; i++){
        console.log(r[i]);
        $result.append(template(r[i]));
      }
  
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

console.log("before start..");

});
