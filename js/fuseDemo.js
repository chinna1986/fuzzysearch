
$(function() {
  function start(books) {
    var $inputSearch = $('#inputSearch'),
        $result = $('#results'),

        $authorCheckbox = $('#author'),
        $titleCheckbox = $('#title'),
        $caseCheckbox = $('#case'),

        $showList = $('.buttons .show-hide'),
        $edit = $('.buttons .edit'),
        $save = $('.buttons .save'),
        $cancel = $('.buttons .cancel'),

        searchAuthors = false,
        searchTitles = true,
        isCaseSensitive = false,
        entireListActive = false,
        editModeOn = false,

        resultTemplate = Handlebars.compile($('#result-template').html()),
        entireListTemplate = Handlebars.compile($('#entire-list').html()),

        stringJSON = JSON.stringify(books, null, 4),

        fuse;

    function search() {
      var r = fuse.search($inputSearch.val());
    
      console.log("searching..")

      $result.html(resultTemplate(r));
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

    function onListButtonPress(){
      entireListActive = !entireListActive;
      listButtonState();
    }

    function onEditButtonPress(){
      editModeOn = !editModeOn;
      editButtonStatus();
      console.log("edit mode on: ", editModeOn);
    }

    function onCancelButtonPress(){
      editModeOn = !editModeOn;
      editButtonStatus();
      console.log("edit mode on: ", editModeOn);
    }

    function onSaveButtonPress(){
      editModeOn = !editModeOn;
      stringJSON = $('.edit-box').val();
      books = JSON.parse(stringJSON);
      createFuse();
      editButtonStatus();
      console.log("edit mode on: ", editModeOn);
    }

    function listButtonState(){
      if (entireListActive){
        console.log("show list pressed..");
        $showList.html("Hide List");
        $edit.toggleClass('on');
        $('#show-list').append(entireListTemplate(books));
        console.log(books);
      }
      else{
        console.log("hide list pressed..");
        $showList.html("Show List");
        $('#show-list').empty();
        $edit.toggleClass('on');
      }
    }

    function editButtonStatus(){
        if(editModeOn){
          $('#list-div').replaceWith('<textarea class="edit-box" />');
          $('.edit-box').val(stringJSON);
          console.log(books);
        }
        else{
          $('.edit-box').replaceWith('<div id="list-div" />');
          $('#list-div').append('<ul id="show-list" />');
          $('#show-list').append(entireListTemplate(books));
        }
        $edit.toggleClass('on');
        $save.toggleClass('on');
        $cancel.toggleClass('on');
        $showList.toggleClass('on');
    }

    (function(){

    })();

    $authorCheckbox.on('change', onAuthorCheckboxChanged);
    $titleCheckbox.on('change', onTitleCheckboxChanged);
    $caseCheckbox.on('change', onCaseCheckboxChanged);

    $inputSearch.on('keyup', search);

    $showList.on('click', onListButtonPress);
    $edit.on('click', onEditButtonPress);
    $cancel.on('click', onCancelButtonPress);
    $save.on('click', onSaveButtonPress);

    console.log('about to create fuse');
    createFuse();
  }

  $.getJSON('assets/booklist.json', function(data) {
    var mainTemplate = Handlebars.compile($('#main-template').html());
    $('body').prepend(mainTemplate());
    start(data);
  });
});