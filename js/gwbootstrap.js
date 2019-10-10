/*
 * Copyright (C) Duncan Macleod (2013)
 *
 * This file is part of GWSumm
 *
 * GWSumm is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * GWSumm is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with GWSumm.  If not, see <http://www.gnu.org/licenses/>
 */

"use strict";

/* ------------------------------------------------------------------------- */
/* Calendar links                                                            */
var re_dayurl = new RegExp('day\/\\d{8}\/');
var re_monthurl = new RegExp('month\/\\d{6}\/');
var re_yearurl = new RegExp('year\/\\d{4}\/');

function findDateFormat() {
  var url = window.location.href;
  if (re_dayurl.test(url)) {
    return 'day';
  }
  if (re_monthurl.test(url)) {
    return 'month';
  }
  if (re_yearurl.test(url)) {
    return 'year';
  }
  return undefined;
}

function getPageDate() {
  var dateformat = findDateFormat();
  if (dateformat == 'day') {
    var datestring =
      String(re_dayurl.exec(window.location.href)).split('/')[1];
    return moment(datestring, 'YYYYMMDD');
  }
  if (dateformat == 'month') {
    var datestring =
      String(re_monthurl.exec(window.location.href)).split('/')[1];
    return moment(datestring, 'YYYYMM');
  }
  if (dateformat == 'year') {
    var datestring =
      String(re_yearurl.exec(window.location.href)).split('/')[1];
    return moment(datestring, 'YYYY');
  }
  throw "Cannot parse date format '" + dateformat + "'";
}

function stepDate(step) {
  var dateformat = findDateFormat();
  if (!dateformat) {
    return;
  }
  var date = getPageDate();
  var newdate = date.add(dateformat, step);
  if (dateformat == 'day') {
    move_to_date({type: 'changeDate', date: newdate});
  } else if (dateformat == 'month') {
    move_to_date({type: 'changeMonth', date: newdate});
  } else if (dateformat == 'year') {
    move_to_date({type: 'changeYear', date: newdate});
  }
}

// Move to the date selected
function move_to_date(ev) {
  var url = window.location.href;
  var date = moment(ev.date);
  // find new date format
  if (ev.type == 'changeDate') {
    var newformat = 'day/' + date.format('YYYYMMDD') + '/';
    var dispdate = date.format('MMMM Do YYYY');
  }
  else if (ev.type == 'changeMonth') {
    var newformat = 'month/' + date.format('YYYYMM') + '/';
    var dispdate = date.format('MMMM YYYY');
  }
  else if (ev.type == 'changeYear') {
    var newformat = 'year/' + date.format('YYYY') + '/';
    var dispdate = date.format('YYYY');
  }
  // work through starting formats and proceed
  if (re_dayurl.test(url)) {
    var newurl = url.replace(re_dayurl, newformat);
  } else if (re_monthurl.test(url)) {
    var newurl = url.replace(re_dayurl, newformat);
  } else if (re_yearurl.test(url)) {
    var newurl = url.replace(re_dayurl, newformat);
  } else if (window.location.href ==
               document.getElementsByTagName('base')[0].href) {
    var newurl = window.location.href + newformat;
  } else {
    alert("ERROR: Cannot format new date. If the problem persists, please report this at https://github.com/gwpy/gwsumm/issues/");
  }
  window.location = newurl;
}

// Shorten date in calendar if very small screen
function shortenDate() {
  var $calendar = jQuery('#calendar');
  var date_ = moment($calendar.data('date'),
                     $calendar.data('date-format').toUpperCase());
  if ($calendar.html().startsWith('Calendar')) {  // don't break non-dates
    return;
  }
  if (jQuery(document).width() < 400 ) {  // print shortened month name
    $calendar.html(date_.format('MMM D YYYY'));
  } else {  // print full month name
    $calendar.html(' ' + date_.format('MMMM D YYYY') + ' <b class="caret"></b>');
  }
}

/* ------------------------------------------------------------------------- */
/* Fancybox images                                                           */

// resize fancybox iframe to 'normal' proportions
function resizeFancyboxIframe() {
  var width = Math.min(1200, jQuery(".fancybox-skin").width());
  var height = (width - 40) * 0.5;
  if (width > document.body.clientWidth ) {
    jQuery(".fancybox-iframe").width(width - 40);
  } else {
    jQuery(".fancybox-iframe").width(width);
  }
  jQuery(".fancybox-wrap").width(width + 30);

  // set heights as half width
  jQuery(".fancybox-iframe").height(parseInt(jQuery(".fancybox-iframe").width() * 0.5));
  jQuery(".fancybox-wrap").height(parseInt(jQuery(".fancybox-wrap").width() * 0.5));
}

/* ------------------------------------------------------------------------- */
/* Overlay figures                                                           */

function getSelectedFigures() {
  var stored = sessionStorage.getItem('selectedFigures');
  var selectedFigures = JSON.parse(stored) || [];
  return selectedFigures;
}

function setSelectedFigures(value) {
  var stored = JSON.stringify(value);
  sessionStorage.setItem('selectedFigures', stored);
}

// Handle new figures
function appendFigure(src, selectedFigures) {
  if (src.includes('SPECTROGRAM') || src.includes('TRIGGER')) {
    selectedFigures.unshift(src);
  } else {
    selectedFigures.push(src);
  }
  setSelectedFigures(selectedFigures);
}

// Construct figure canvas
function setupCanvas(canvas) {
  var dpr = window.devicePixelRatio || 1;
  var rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  var context = canvas.getContext('2d');
  context.scale(dpr, dpr);
  return context;
}

// Render overlay figure
function overlayFigures() {
  var dpr = window.devicePixelRatio || 1;
  var selectedFigures = getSelectedFigures();
  var canvas = document.getElementById('overlay-canvas');
  var context = setupCanvas(canvas);
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let src of selectedFigures) {
    let figure = new Image();
    figure.src = src;
    context.drawImage(figure, 0, 0, canvas.width / dpr, canvas.height / dpr);
  }
}

// Download overlay figure
function downloadOverlay() {
  var canvas = document.getElementById('overlay-canvas');
  var downloadLink = document.createElement('a');
  downloadLink.download = 'overlay.png';
  downloadLink.href = canvas.toDataURL('image/png');
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  downloadLink.click();
}

// Clear all figures
function clearFigures() {
  var selectedFigures = getSelectedFigures();
  var canvas = document.getElementById('overlay-canvas');
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  selectedFigures.length = 0;
  setSelectedFigures(selectedFigures);
}

/* ------------------------------------------------------------------------- */
/* Navbar actions                                                            */

// Load a given 'state'
jQuery.fn.load_state = function loadState(page) {
  if (jQuery(this).attr('id') == undefined) {
    return;
  }
  jQuery('#main').load(page);
  jQuery(this).set_state();
}

// Set a given state in the menu
jQuery.fn.set_state = function setState() {
  if (jQuery(this).attr('id') == undefined) {
    return;
  }
  var id = jQuery(this).attr('id').substring(6);
  jQuery('#states').html(jQuery(this).attr('title') + ' <b class="caret"></b>');
  jQuery('.state').removeClass('open');
  jQuery(this).toggleClass('open');
  window.location.hash = '#' + id;
  jQuery('a.ifo-switch').each(function() {
    var oldurl = jQuery(this).attr('href');
    var oldhash = oldurl.split('#')[1];
    jQuery(this).attr('href', oldurl.replace(oldhash, id));
  });
}

// Fix width of fixed navbar
function reset_width_on_resize() {
  jQuery('#nav').width(jQuery("#nav").width());
}

/* ------------------------------------------------------------------------- */
/* Document ready and loaded                                                 */

// When document is ready, run this stuff:
jQuery(window).load(function() {

  // compatibility of Bootstrap and jQuery UI elements
  jQuery.ui.dialog.prototype._focusTabbable = function(){};
  jQuery.fn.bootstrapBtn = jQuery.fn.button.noConflict();

  // shorten the date
  if (jQuery('#calendar').length){shortenDate();}

  // define inter-IFO links
  var thisbase = document.getElementsByTagName('base')[0].href;
  jQuery('[data-new-base]').each(function() {
    var newbase = jQuery(this).data('new-base') + '/';
    jQuery(this).attr('href', window.location.href.replace(thisbase, newbase));
  });

  // define the calendar
  jQuery('#calendar').datepicker({
    endDate: moment().utc().format('DD/MM/YYYY'),
    todayHighlight: true,
    todayBtn: "linked"
  }).on('changeDate', move_to_date);

  // load correct run type
  if (location.hash.length > 1) {
    var hash = location.hash.substring(1);
    var path = location.pathname + hash + '.html';
    jQuery('#state_' + hash).load_state(path);
  }

  // load the fancybox
  jQuery(".fancybox").fancybox({
    selector: '[data-fancybox-group="images"]',
    nextEffect: 'none',
    prevEffect: 'none',
    width: 1200,
    loop: true,
    backFocus: false,
    iframe: {scrolling: 'no'},
    scrolling: 'no',
    beforeShow: resizeFancyboxIframe,
    helpers: {overlay: {locked: false},
              title: {type: 'inside'}}
  });

  // custom fancybox for stamp-pem bokeh plot
  jQuery(".fancybox-stamp").fancybox({
    width: 1000,
    height: 500,
    showNavArrows: false,
    padding: 0,
    title: this.title,
    href: jQuery(this).attr('href'),
    type: 'iframe'
  });

  // reposition dropdown if scrolling off the screen
  jQuery('.dropdown-toggle').click(function() {
    // if page width is small, no-operation
    if (jQuery(document).width() < 992) {
      return;
    }
    // otherwise add pull-right
    var target = jQuery(this).nextAll('.dropdown-menu');
    var dropleft = jQuery(this).offset().left;
    var dropwidth = target.width();
    var left = jQuery(window).width();
    var offright = (dropleft + dropwidth > left);
    if (offright) {
      target.addClass('pull-right');
    }
  });

  // set up dialog element
  jQuery(".dialog").dialog({
    autoOpen: false,
    draggable: false,
    height: 0.8 * jQuery(window).height(),
    width: 0.9 * jQuery(window).width(),
    modal: true,
    show: true,
    hide: true
  });
  
  // click outside to close dialog
  jQuery("body").on('click', '.ui-widget-overlay', function() {
    jQuery('.dialog').dialog('close');
  });
  
  // open dialog
  jQuery(".btn-open").click(function() {
    var id = jQuery(this).data('id')
    jQuery(id).dialog('open');
  });

  // overlay actions
  jQuery("#overlay-figures").click(overlayFigures);
  jQuery("#download-overlay").click(downloadOverlay);
  jQuery("#clear-figures").click(clearFigures);

});

// After elements are loaded with AJAX, run this:
jQuery(document).ajaxComplete(function(ev, xhr, settings) {

  // custom tooltips
  jQuery(".fancybox").tooltip();
  jQuery(".fancybox-stamp").tooltip();
  jQuery(".icon-bar a").tooltip();
  jQuery(".btn-float").tooltip();
  jQuery(".btn").tooltip();

  // make figure elements draggable
  jQuery(".img-responsive").draggable({
    helper: 'clone',
    scroll: false,
    stack: '.img-responsive'
  });
  
  // handle figure drop events
  jQuery("#overlay-btn").droppable({
    accept: '.img-responsive',
    classes: { 'ui-droppable-active': 'ui-state-highlight' },
    tolerance: 'pointer',
    drop: function(ev, ui) {
      ev.preventDefault();
      var selectedFigures = getSelectedFigures();
      var src = ui.draggable.attr('src');
      // if new, sort and append to selectedFigures
      if (selectedFigures.indexOf(src) === -1) {
        appendFigure(src, selectedFigures);
      }
    }
  });

});

jQuery(window).resize(function() {
  // set short month date
  if (jQuery('#calendar').length){shortenDate();}
});
