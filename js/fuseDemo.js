
$(function() {
  function start(collection) {
    var $inputSearch = $('#inputSearch'),
        $result = $('#results'),

        $caseCheckbox = $('#case'),
        filterCheckbox = $('.filter-checkbox'),

        $showList = $('.buttons .show-hide'),
        $edit = $('.buttons .edit'),
        $save = $('.buttons .save'),
        $cancel = $('.buttons .cancel'),

        isCaseSensitive = false,
        entireListActive = false,
        editModeOn = false,

        resultTemplate = Handlebars.compile($('#result-template').html()),
        entireListTemplate = Handlebars.compile($('#entire-list').html()),
        checklistTemplate = Handlebars.compile($('#checkbox-template').html()),
      
        stringJSON = JSON.stringify(collection, null, 4),

        filters = Object.keys(collection[0]),
        checkboxChecked = [],

        fuse;

    function search() {
      var r = fuse.search($inputSearch.val());
          // resultsObject = {
          //   results: r,
          //   keys: filters
          // };
    
      console.log("searching..")

      $result.html(resultTemplate(r));

      console.log(r);
      // console.log("resultObject results: ", resultsObject.results);
      // console.log("resultObject keys: ", resultsObject.keys);
    }

    function createFuse() {
      var keys = [];
      var $filterCheckboxes = $('.filter-checkbox');

      console.log("creating fuse...");

      $filterCheckboxes.each(function(){
        var $this = $(this);
        if($this.prop('checked')){
          keys.push($this.data('filter'));
        }
      });
      console.log('fuse keys', keys);
      fuse = new Fuse(collection, {
        keys: keys,
        caseSensitive: isCaseSensitive
      });
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
      collection = JSON.parse(stringJSON);
      createFuse();
      editButtonStatus();
      console.log("edit mode on: ", editModeOn);
    }

    function listButtonState(){
      if (entireListActive){
        console.log("show list pressed..");
        $showList.html("Hide List");
        $edit.toggleClass('on');
        $('#show-list').append(entireListTemplate(collection));
        console.log(collection);
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
          console.log(collection);
        }
        else{
          $('.edit-box').replaceWith('<div id="list-div" />');
          $('#list-div').append('<ul id="show-list" />');
          $('#show-list').append(entireListTemplate(collection));
        }
        $edit.toggleClass('on');
        $save.toggleClass('on');
        $cancel.toggleClass('on');
        $showList.toggleClass('on');
    }

    function onFilterCheckboxChanged () {
      var $this = $(this);
      var filterValue = $this.data('filter');
      $this.prop('checked');
      createFuse();
      search();
    }

    (function(){
      $('.checkboxes').prepend(checklistTemplate(filters));
    })();

    $caseCheckbox.on('change', onCaseCheckboxChanged);

    $inputSearch.on('keyup', search);

    $('.filter-checkbox').on('change', onFilterCheckboxChanged);
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