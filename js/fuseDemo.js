
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
        $resultDiv = $('#result-div'),

        isCaseSensitive = false,
        entireListActive = false,
        editModeOn = false,
        showSearchResults = false,

        resultTemplate = Handlebars.compile($('#result-template').html()),
        entireListTemplate = Handlebars.compile($('#entire-list').html()),
        checklistTemplate = Handlebars.compile($('#checkbox-template').html()),
      
        stringJSON = JSON.stringify(collection, null, 4),

        filters = Object.keys(collection[0]),
        collectionObject = {
          objects: collection,
          keys: filters
        },

        fuse;

    function search() {
      var r = fuse.search($inputSearch.val());
          resultsObject = {
            results: r,
            keys: filters
          };

      if(r.length === 0){
        showSearchResults = false;
      }
      else{
        showSearchResults = true;
      }

      console.log("show search results", showSearchResults);

      showResultStatus();
    
      console.log("searching..")

      $result.html(resultTemplate(resultsObject));

      console.log(r);
      // console.log("resultObject results: ", resultsObject.results);
      // console.log("resultObject keys: ", resultsObject.keys);
    }

    function showResultStatus(){
      if(showSearchResults){
        if(!$resultDiv.hasClass('show-search-results')){
          $resultDiv.addClass('show-search-results');
          $inputSearch.addClass('show-search-results');
          console.log("class added");
        }
      }
      else{
        if($resultDiv.hasClass('show-search-results')){
          $resultDiv.removeClass('show-search-results');
          $inputSearch.removeClass('show-search-results');
          console.log("class removed");
        }
      }
    }

    function createFuse() {
      var keys = [],
          $filterCheckboxes = $('.filter-checkbox');

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

    function onFilterCheckboxChanged () {
      var $this = $(this),
          filterValue = $this.data('filter');

      $this.prop('checked');
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
      search();
      console.log("edit mode on: ", editModeOn);
    }

    function listButtonState(){
      if (entireListActive){
        console.log("show list pressed..");
        $showList.html("Hide List");
        $edit.toggleClass('on');
        $('#show-list').append(entireListTemplate(collectionObject));
        console.log(collection);
        console.log("collection object: ", collectionObject);
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
          collectionObject.objects = collection;
          $('#show-list').append(entireListTemplate(collectionObject));
        }
        $edit.toggleClass('on');
        $save.toggleClass('on');
        $cancel.toggleClass('on');
        $showList.toggleClass('on');
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

  $.getJSON('assets/phones.json', function(data) {
    var mainTemplate = Handlebars.compile($('#main-template').html());

    $('body').prepend(mainTemplate());
    start(data);
  });
});