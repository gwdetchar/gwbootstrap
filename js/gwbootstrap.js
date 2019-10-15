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

// Include a return-to-top button
jQuery.fn.scrollView = function scrollView() {
  return this.each(() => {
    jQuery('html, body').animate({
      scrollTop: 0,
    }, 800);
  });
};

// Expand fancybox plots
jQuery(document).ready(() => {
  jQuery('.fancybox').fancybox({
    nextEffect: 'none',
    prevEffect: 'none',
    backFocus: false,
    helpers: { title: { type: 'inside' } },
  });
});

// Expose alternative image types
// eslint-disable-next-line no-unused-vars
function showImage(channelName, tRanges, imageType, captions) {
  for (let i = 0; i < tRanges.length; i += 1) {
    const idBase = `${channelName}_${tRanges[i]}`;
    const fileBase = `${channelName}-${imageType}-${tRanges[i]}`;
    document.getElementById(`a_${idBase}`).href = `plots/${fileBase}.png`;
    document.getElementById(`a_${idBase}`).title = captions[tRanges[i]];
    document.getElementById(`img_${idBase}`).src = `plots/${fileBase}.png`;
    document.getElementById(`img_${idBase}`).alt = `${fileBase}.png`;
  }
}

// Download a CSV table
// eslint-disable-next-line no-unused-vars
function downloadCSV(csv, filename) {
  // set download attributes
  const csvFile = new Blob([csv], { type: 'text/csv' });
  const downloadLink = document.createElement('a');
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  // download action
  downloadLink.click();
}

// Export a table to CSV
// eslint-disable-next-line no-unused-vars
function exportTableToCSV(filename, tableId) {
  const csv = [];
  const table = document.getElementById(tableId);
  const rows = table.querySelectorAll('table tr');
  // get table rows
  for (let i = 0; i < rows.length; i += 1) {
    const row = []; const cols = rows[i].querySelectorAll('td, th');
    for (let j = 0; j < cols.length; j += 1) { row.push(cols[j].innerText); }
    csv.push(row.join(','));
  }
  // download CSV record
  downloadCSV(csv.join('\n'), filename);
}
