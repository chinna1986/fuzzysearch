
$(function() {
  function start(collection) {
    var $caseButton = $('#case'),
        $showList = $('.buttons .show-hide'),
        $edit = $('.buttons .edit'),
        $save = $('.buttons .save'),
        $cancel = $('.buttons .cancel'),

        caseEnabled = false,
        entireListActive = false,
        editModeOn = false,

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
      var r = fuse.search($('#inputSearch').val()),
          resultsObject = { 
            results: r,
            keys: filters
          };

      $('#result-div').toggle(!!r.length);
      $('#results').html(resultTemplate(resultsObject));

      console.log(r);
    }

    function createFuse() {
      var keys = [],
          $filterCheckboxes = $('.filter-checkbox');

      console.log('creating fuse...');

      $filterCheckboxes.each(function(){
        if($(this).prop('checked')){
            keys.push($(this).data('filter'));
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
      var filterValue = $(this).data('filter');

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
      stringJSON = $('.edit-box').val();
      collection = JSON.parse(stringJSON);
      editModeOn = !editModeOn;
      editButtonStatus();
      createFuse();
      search();
      console.log("edit mode on: ", editModeOn);
    }

    function onCaseButtonPress() {
      caseEnabled = !caseEnabled;
      caseButtonState();
      createFuse();
      search();
    }

    function caseButtonState(){
      if(caseEnabled){
        $caseButton.html('Disable Case Sensitivity');
        if($caseButton.hasClass('btn-info')){
          $caseButton.removeClass('btn-info');
        }
        $caseButton.addClass('btn-danger');
      }
      else{
        $caseButton.html('Enable Case Sensitivity');
        if($caseButton.hasClass('btn-danger')){
          $caseButton.removeClass('btn-danger');
        }
        $caseButton.addClass('btn-info');
      }
    }

    function allFilterOn(){
      $('.filter-checkbox').each(function(){
        $(this).prop('checked', true);
      });
      createFuse();
      search();
    }

    function allFilterOff(){
      $('.filter-checkbox').each(function(){
        $(this).prop('checked', false);
      });
      createFuse();
      search();
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

    $('#inputSearch').on('keyup', search);
    $('.filter-checkbox').on('change', onFilterCheckboxChanged);

    $showList.on('click', onListButtonPress);
    $edit.on('click', onEditButtonPress);
    $cancel.on('click', onCancelButtonPress);
    $save.on('click', onSaveButtonPress);
    $caseButton.on('click', onCaseButtonPress);

    $('#all-on').on('click', allFilterOn);
    $('#all-off').on('click', allFilterOff);

    console.log('about to create fuse');
    createFuse();
  }

  $.getJSON('assets/booklist.json', function(data) {
    var mainTemplate = Handlebars.compile($('#main-template').html());

    $('body').prepend(mainTemplate());
    start(data);
  });
});