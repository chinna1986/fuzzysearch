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

        //context = {title: "book test", author: "author test"},
        //html = pushToTemp(context),

        fuse;

    function search() {
      var r = fuse.search($inputSearch.val());
      $result.empty();
      $.each(r, function() {
        $result.append('<li class="result-item">' + this.title + ', <span>' + this.author + '</span></li>');
      //$(document.body).html(html);
    });}

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

  /*$.getJSON('booklist.json', function(data) {
     start(data);
  });*/

var data = [
{
  "title": "Old Man's War",
  "author": "John Scalzi"
},
{
  "title": "The Lock Artist",
  "author": "Steve Hamilton"
},
{
  "title": "HTML5",
  "author": "Remy Sharp"
},
{
  "title": "Right Ho Jeeves",
  "author": "P.D. Woodhouse"
}
,
{
  "title": "The Code of the Wooster",
  "author": "P.D. Woodhouse"
}
,
{
  "title": "Thank You Jeeves",
  "author": "P.D. Woodhouse"
}
,
{
  "title": "The DaVinci Code",
  "author": "Dan Brown"
},
{
  "title": "Angels & Demons",
  "author": "Dan Brown"
}
,
{
  "title": "The Silmarillion",
  "author": "J.R.R Tolkien"
}
,
{
  "title": "Syrup",
  "author": "Max Barry"
}
,
{
  "title": "The Lost Symbol",
  "author": "Dan Brown"
},
{
  "title": "The Book of Lies",
  "author": "Brad Meltzer"
},
{
  "title": "Lamb",
  "author": "Christopher Moore"
},
{
  "title": "Fool",
  "author": "Christopher Moore"
},
{
  "title": "Incompetence",
  "author": "Rob Grant"
},
{
  "title": "Fat",
  "author": "Rob Grant"
},
{
  "title": "Colony",
  "author": "Rob Grant"
},
{
  "title": "Backwards, Red Dwarf",
  "author": "Rob Grant"
}
,
{
  "title": "The Grand Design",
  "author": "Stephen Hawking"
}
,
{
  "title": "The Book of Samson",
  "author": "David Maine"
},
{
  "title": "The Preservationist",
  "author": "David Maine"
},
{
  "title": "Fallen",
  "author": "David Maine"
},
{
  "title": "Monster 1959",
  "author": "David Maine"
}
];

console.log("before start..");
start(data); 

});
