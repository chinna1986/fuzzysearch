function type(){
    var keyPressed = $(this),
        character = keyPressed.html(),
        $searchBar = $('#inputSearch'),
        $textBox = $('.edit-box'),
        shift = false,
        capslock = false;

    if (keyPressed.hasClass('left-shift') || keyPressed.hasClass('right-shift')) {
        $('.letter').toggleClass('uppercase');
        $('.symbol span').toggle();
        shift = (shift === true) ? false : true;
        capslock = false;
        return false;
    }

    if (keyPressed.hasClass('capslock')) {
        $('.letter').toggleClass('uppercase');
        capslock = true;
        return false;
    }

    if (keyPressed.hasClass('delete')) {
        var val = $searchBar.val();
        $searchBar.val(val.substr(0, val.length - 1));
        return false;
    }

    if(keyPressed.hasClass('hide-keyboard')){
        $('.keyboard').toggle();
        return;
    }

    if (keyPressed.hasClass('return')) { selectUnit(); }
    if (keyPressed.hasClass('symbol')) character = $('span:visible', keyPressed).html();
    if (keyPressed.hasClass('space')) character = ' ';
    if (keyPressed.hasClass('tab')) character = "\t";
    if (keyPressed.hasClass('return')) character = "\n";
    if (keyPressed.hasClass('uppercase')) character = character.toUpperCase();

    if (shift === true) {
        $('.symbol span').toggle();
        if (capslock === false) $('.letter').toggleClass('uppercase');  
        shift = false;
    }

    $searchBar.val($searchBar.val() + character);
    $searchBar.focus();
    return;
}