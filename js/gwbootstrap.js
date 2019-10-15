/**
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
 *
 * @summary Basic utilities for GW-Bootstrap pages
 * @author Duncan Macleod <duncan.macleod@ligo.org>
 * @author Alex Urban <alexander.urban@ligo.org>
 */

/* ------------------------------------------------------------------------- */
/* Actions on window load or resize                                          */

// Match page position to navbar height
function matchPageTopToNavbar() {
  jQuery('.navbar-fixed-top + .container').css('padding-top', jQuery('header').height());
}

// Match footer height to content
function matchFooterHeight() {
  const $footer = jQuery('.footer');
  const fpad = $footer.outerHeight() - $footer.height();
  const newheight = jQuery('.footer > .container').outerHeight();
  const padtop = parseInt($footer.css('padding-top'), 10);
  const padbottom = parseInt($footer.css('padding-bottom'), 10);
  $footer.height(newheight + fpad);
  jQuery('body').css('margin-bottom', $footer.outerHeight() + padtop + padbottom);
}

// Reposition floating buttons
function matchFloatingButtons() {
  const $floatBtn = jQuery('.btn-float');
  const screenWidth = jQuery('header').width();
  if (screenWidth >= 992 && $floatBtn.length > 1) {
    $floatBtn.each(function (i) {
      jQuery(this).css('right', `${(90 + 60 * i).toString()}px`);
    });
  }
}

// Now we're cooking with gas
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

// Download a CSV table
function downloadCSV(csv, filename) {
  const csvFile = new Blob([csv], { type: 'text/csv' });
  const downloadLink = document.createElement('a');
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  downloadLink.click();
}

// Export a table to CSV
function exportTableToCSV(ev) {
  const filename = jQuery(ev).attr('data-filename');
  const tableId = jQuery(ev).attr('data-table-id');
  const csv = [];
  const table = document.getElementById(tableId);
  const rows = table.querySelectorAll('table tr');
  // get table rows
  for (let i = 0; i < rows.length; i += 1) {
    const row = [];
    const cols = rows[i].querySelectorAll('td, th');
    for (let j = 0; j < cols.length; j += 1) { row.push(cols[j].innerText); }
    csv.push(row.join(','));
  }
  downloadCSV(csv.join('\n'), filename);
}

// Expose alternative image types
function showImage(ev) {
  const captions = jQuery(ev).attr('data-captions');
  const channelName = jQuery(ev).attr('data-channel-name');
  const imageDir = jQuery(ev).attr('data-image-dir');
  const imageType = jQuery(ev).attr('data-image-type');
  const tRanges = jQuery(ev).attr('data-t-ranges');
  for (let i = 0; i < tRanges.length; i += 1) {
    const idBase = `${channelName}_${tRanges[i]}`;
    const fileName = `${channelName}-${imageType}-${tRanges[i]}.png`;
    const filePath = `${imageDir}/${fileName}`;
    jQuery(`#a_${idBase}`).attr('href', filePath);
    jQuery(`#a_${idBase}`).attr('title', captions[i]);
    jQuery(`#img_${idBase}`).attr('alt', fileName);
    jQuery(`#img_${idBase}`).attr('src', filePath);
  }
}

// Include a return-to-top button
jQuery.fn.scrollView = function scrollView() {
  return this.each(() => {
    jQuery('html, body').animate({
      scrollTop: 0,
    }, 800);
  });
};

// Now we're cooking with gas
jQuery(document).ready(() => {
  jQuery('.btn-table').click(exportTableToCSV);
  jQuery('.image-switch').click(showImage);
  jQuery('#top-btn').click(() => {
    jQuery(this).scrollView();
  });

  // lazy loading for pages with lots of images
  jQuery('.lazy').Lazy({
    scrollDirection: 'vertical',
    effect: 'fadeIn',
    visibleOnly: true,
    onError: (element) => {
      console.log(`error loading ${element.data('src')}`);
    },
  });

  // expand fancybox plots
  jQuery('.fancybox').fancybox({
    nextEffect: 'none',
    prevEffect: 'none',
    backFocus: false,
    helpers: { title: { type: 'inside' } },
  });
});
