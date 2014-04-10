
$(function() {
  function start(collection) {
    var $inputSearch = $('#inputSearch'),
        $result = $('#results'),

        $caseButton = $('#case'),
        $showList = $('.buttons .show-hide'),
        $edit = $('.buttons .edit'),
        $save = $('.buttons .save'),
        $cancel = $('.buttons .cancel'),
        $all = $('#all'),
        $resultDiv = $('#result-div'),
        $resultTitle = $('.search-result-title'),

        caseEnabled = false,
        searchAllEnabled = false,
        entireListActive = false,
        editModeOn = false,
        showSearchResults = false,

        resultTemplate = Handlebars.compile($('#result-template').html()),
        entireListTemplate = Handlebars.compile($('#entire-list-template').html()),
        checklistTemplate = Handlebars.compile($('#checkbox-template').html()),
      
        stringJSON = JSON.stringify(collection, null, 4),

        filters = Object.keys(collection[0]),
        collectionObject = {
          objects: collection,
          keys: filters
        },

        fuse;

    function search() {
      var r = fuse.search($inputSearch.val()),
          resultsObject = {
            results: r,
            keys: filters
          };

      showSearchResults = !!r.length;

      console.log("show search results", showSearchResults);

      showResultStatus();
    
      console.log("searching..")

      $result.html(resultTemplate(resultsObject));

      console.log(r);
    }

    function showResultStatus(){
      if(showSearchResults){
        if(!$resultDiv.hasClass('show-search-results')){
          $resultDiv.addClass('show-search-results');
          $resultTitle.addClass('show-search-results');
          console.log("class added");
        }
      }
      else{
        if($resultDiv.hasClass('show-search-results')){
          $resultDiv.removeClass('show-search-results');
          $resultTitle.removeClass('show-search-results');
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
      console.log("fuse case sensitive: ", caseEnabled);

      fuse = new Fuse(collection, {
        keys: keys,
        caseSensitive: caseEnabled
      });
    }

    function onFilterCheckboxChanged(){
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

    function onCaseButtonPress() {
      caseEnabled = !caseEnabled;
      toggleButtonState($caseButton, caseEnabled, 'Disable Case Sensitivity', 'Enable Case Sensitivity');
      createFuse();
      search();
    }

    function onAllButtonPress(){
      searchAllEnabled = !searchAllEnabled;
      console.log("search all enabled: ", searchAllEnabled);
      toggleButtonState($all, searchAllEnabled, 'Disable All Filters', 'Enable All Filters');
      allButtonState();
      createFuse();
      search();
    }

    function toggleButtonState(button, buttonState, enabledButtonString, disabledButtonString){
      if(buttonState){
        button.html(enabledButtonString);
        if(button.hasClass('btn-info')){
          button.removeClass('btn-info');
        }
        button.addClass('btn-danger');
      }
      else{
        button.html(disabledButtonString);
        if(button.hasClass('btn-danger')){
          button.removeClass('btn-danger');
        }
        button.addClass('btn-info');
      }
    }

    function allButtonState(){
      if(searchAllEnabled){
        $('.filter-checkbox').each(function(){
          if(! $(this).prop('checked')){
            console.log("checking ", $(this));
            $(this).prop('checked', true);
          }
          console.log($(this), " checked: ", $(this).is(':checked'));
        });
      }
      else{
        $('.filter-checkbox').each(function(){
          if($(this).prop('checked')){
            console.log("unchecking ", $(this));
            $(this).prop('checked', false);
          }
        });
      }
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

    $('.checkboxes').prepend(checklistTemplate(filters));

    $inputSearch.on('keyup', search);
    $('.filter-checkbox').on('change', onFilterCheckboxChanged);
    $showList.on('click', onListButtonPress);
    $edit.on('click', onEditButtonPress);
    $cancel.on('click', onCancelButtonPress);
    $save.on('click', onSaveButtonPress);
    $caseButton.on('click', onCaseButtonPress);
    $all.on('click', onAllButtonPress);

    console.log('about to create fuse');
    createFuse();
  }

  $.getJSON('assets/phones.json', function(data) {
    var mainTemplate = Handlebars.compile($('#main-template').html());

    $('body').prepend(mainTemplate());
    start(data);
  });
});