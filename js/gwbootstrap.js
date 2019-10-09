/*
 * Copyright (C) Duncan Macleod (2015)
 *
 * This file is part of GW-Bootstrap
 *
 * GW-Bootstrap is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * GW-Bootstrap is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with GW-Bootstrap.  If not, see <http://www.gnu.org/licenses/>
 */

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
