/** match page position to navbar height */
function matchPageTopToNavbar() {
  $('.navbar-fixed-top + .container').css('padding-top', $('header').height());
}

/** match footer height to content */
function matchFooterHeight() {
  // get container dimensions
  var newheight = $('.footer > .container').outerHeight();
  // reset footer height
  $footer = $('.footer');
  fpad = $footer.outerHeight() - $footer.height();
  $footer.height(newheight + fpad);
  // reset body margin
  padtop = parseInt($footer.css('padding-top'));
  padbottom = parseInt($footer.css('padding-bottom'));
  $('body').css('margin-bottom', $footer.outerHeight() + padtop + padbottom);
}

$(window).load(function() {
  matchPageTopToNavbar();
  matchFooterHeight();
});
$(window).resize(function() {
  matchPageTopToNavbar();
  matchFooterHeight();
});
