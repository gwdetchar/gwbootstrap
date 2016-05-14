// match page position to navbar height
function matchPageTopToNavbar() {
  $('.navbar-fixed-top + .container').css('padding-top', $('header').height());
}
$(window).load(function() {
  matchPageTopToNavbar();
});
$(window).resize(function() {
  matchPageTopToNavbar();
});
