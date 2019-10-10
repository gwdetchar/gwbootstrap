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
 * @author Duncan Macleod <duncan.macleod@ligo.org>,
 *         Alex Urban <alexander.urban@ligo.org>
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

/** include a return-to-top button */
$.fn.scrollView = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
  });
}

/** expand fancybox plots */
$(document).ready(function() {
  $(".fancybox").fancybox({
    nextEffect: 'none',
    prevEffect: 'none',
    backFocus: false,
    helpers: {title: {type: 'inside'}}
  });
});

/** expose alternative image types */
function downloadCSV(csv, filename) {
  var csvFile;
  var downloadLink;
  // set download attributes
  csvFile = new Blob([csv], {type: "text/csv"});
  downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  // download action
  downloadLink.click();
}

/** download a CSV table */
function downloadCSV(csv, filename) {
  var csvFile;
  var downloadLink;
  // set download attributes
  csvFile = new Blob([csv], {type: "text/csv"});
  downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  // download action
  downloadLink.click();
}

/** export a table to CSV */
function exportTableToCSV(filename, tableId) {
  var csv = [];
  var table = document.getElementById(tableId);
  var rows = table.querySelectorAll("table tr");
  // get table rows
  for (var i = 0; i < rows.length; i++) {
    var row = [], cols = rows[i].querySelectorAll("td, th");
    for (var j = 0; j < cols.length; j++)
        row.push(cols[j].innerText);
    csv.push(row.join(","));
  }
  // download CSV record
  downloadCSV(csv.join("\n"), filename);
}
