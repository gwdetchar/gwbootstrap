/**
 * Copyright (C) Alex Urban (2019)
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
 *
 * @summary Basic utilities for GW-Bootstrap pages
 * @author Alex Urban <alexander.urban@ligo.org>
 * @author Duncan Macleod <duncan.macleod@ligo.org>
 */

/* globals matchPageTopToNavbar matchFooterHeight matchFloatingButtons       */
/* globals exportTableToCSV showImage                                        */

/* ------------------------------------------------------------------------- */
/* Actions on window load or resize                                          */

jQuery(window).on('load', () => {
  matchPageTopToNavbar();
  matchFooterHeight();
  matchFloatingButtons();
});
jQuery(window).resize(() => {
  matchPageTopToNavbar();
  matchFooterHeight();
  matchFloatingButtons();
});

/* ------------------------------------------------------------------------- */
/* Event listeners when the document is ready                                */

jQuery(document).ready(() => {
  jQuery('.btn-table').click(exportTableToCSV);
  jQuery('.image-switch').click(showImage);
  jQuery('#top-btn').click(function () {
    jQuery(this).scrollView();
  });

  // lazy loading for pages with lots of images
  jQuery('.lazy').Lazy({
    effect: 'fadeIn',
    effectTime: 1000,
    visibleOnly: true,
    scrollDirection: 'vertical',
    onError: (element) => {
      console.log(`error loading ${element.data('src')}`);
    },
  });

  // expand fancybox plots
  jQuery('.fancybox').fancybox({
    selector: '[data-fancybox="gallery"]',
    backFocus: false,
    buttons: [
      'zoom',
      'download',
      'slideShow',
      'thumbs',
      'close',
    ],
    helpers: { title: { type: 'inside' } },
    width: 1200,
  });
});
