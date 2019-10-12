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
 *
 * @summary Extra utilities for GW-Bootstrap pages
 * @author Duncan Macleod <duncan.macleod@ligo.org>
 * @author Alex Urban <alexander.urban@ligo.org>
 */

/* global moment */


/* ------------------------------------------------------------------------- */
/* Calendar links                                                            */
const regexDayURL = new RegExp('day/\\d{8}/');
const regexMonthURL = new RegExp('month/\\d{6}/');
const regexYearURL = new RegExp('year/\\d{4}/');

function findDateFormat() {
  const url = window.location.href;
  if (regexDayURL.test(url)) {
    return 'day';
  }
  if (regexMonthURL.test(url)) {
    return 'month';
  }
  if (regexYearURL.test(url)) {
    return 'year';
  }
  return undefined;
}

function getPageDate() {
  let datestring;
  const dateformat = findDateFormat();
  if (dateformat === 'day') {
    [, datestring] = String(regexDayURL.exec(window.location.href)).split('/');
    return moment(datestring, 'YYYYMMDD');
  }
  if (dateformat === 'month') {
    [, datestring] = String(regexMonthURL.exec(window.location.href)).split('/');
    return moment(datestring, 'YYYYMM');
  }
  if (dateformat === 'year') {
    [, datestring] = String(regexYearURL.exec(window.location.href)).split('/');
    return moment(datestring, 'YYYY');
  }
  throw new Error(`Cannot parse date format '${dateformat}'`);
}

// Move to the date selected
function moveToDate(ev) {
  let newformat;
  let newurl;
  const url = window.location.href;
  const date = moment(ev.date);
  // find new date format
  if (ev.type === 'changeDate') {
    newformat = `day/${date.format('YYYYMMDD')}/`;
  } else if (ev.type === 'changeMonth') {
    newformat = `month/${date.format('YYYYMM')}/`;
  } else if (ev.type === 'changeYear') {
    newformat = `year/${date.format('YYYY')}/`;
  }
  // work through starting formats and proceed
  if (regexDayURL.test(url)) {
    newurl = url.replace(regexDayURL, newformat);
  } else if (regexMonthURL.test(url)) {
    newurl = url.replace(regexDayURL, newformat);
  } else if (regexYearURL.test(url)) {
    newurl = url.replace(regexDayURL, newformat);
  } else if (window.location.href
               === document.getElementsByTagName('base')[0].href) {
    newurl = window.location.href + newformat;
  } else {
    alert('ERROR: Cannot format new date. If the problem persists, please report this at https://github.com/gwpy/gwsumm/issues/');
  }
  window.location = newurl;
}

// Move to the next available date
// eslint-disable-next-line no-unused-vars
function stepDate(step) {
  const dateformat = findDateFormat();
  if (!dateformat) {
    return;
  }
  const date = getPageDate();
  const newdate = date.add(dateformat, step);
  if (dateformat === 'day') {
    moveToDate({ type: 'changeDate', date: newdate });
  } else if (dateformat === 'month') {
    moveToDate({ type: 'changeMonth', date: newdate });
  } else if (dateformat === 'year') {
    moveToDate({ type: 'changeYear', date: newdate });
  }
}

// Shorten date in calendar if very small screen
function shortenDate() {
  const $calendar = jQuery('#calendar');
  const date_ = moment($calendar.data('date'),
    $calendar.data('date-format').toUpperCase());
  if ($calendar.html().startsWith('Calendar')) { // don't break non-dates
    return;
  }
  if (jQuery(document).width() < 400) { // print shortened month name
    $calendar.html(date_.format('MMM D YYYY'));
  } else { // print full month name
    $calendar.html(` ${date_.format('MMMM D YYYY')} <b class="caret"></b>`);
  }
}

/* ------------------------------------------------------------------------- */
/* Fancybox images                                                           */

// Resize fancybox iframe to 'normal' proportions
function resizeFancyboxIframe() {
  const width = Math.min(1200, jQuery('.fancybox-skin').width());
  if (width > document.body.clientWidth) {
    jQuery('.fancybox-iframe').width(width - 40);
  } else {
    jQuery('.fancybox-iframe').width(width);
  }
  jQuery('.fancybox-wrap').width(width + 30);

  // set heights as half width
  jQuery('.fancybox-iframe').height(parseInt(jQuery('.fancybox-iframe').width() * 0.5, 10));
  jQuery('.fancybox-wrap').height(parseInt(jQuery('.fancybox-wrap').width() * 0.5, 10));
}

/* ------------------------------------------------------------------------- */
/* Overlay figures                                                           */

function getSelectedFigures() {
  const stored = sessionStorage.getItem('selectedFigures');
  const selectedFigures = JSON.parse(stored) || [];
  return selectedFigures;
}

function setSelectedFigures(value) {
  const stored = JSON.stringify(value);
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
  const canv = canvas;
  const dpr = window.devicePixelRatio || 1;
  const rect = canv.getBoundingClientRect();
  canv.width = rect.width * dpr;
  canv.height = rect.height * dpr;
  const context = canv.getContext('2d');
  context.scale(dpr, dpr);
  return context;
}

// Render overlay figure
function overlayFigures() {
  const dpr = window.devicePixelRatio || 1;
  const selectedFigures = getSelectedFigures();
  const canvas = document.getElementById('overlay-canvas');
  const context = setupCanvas(canvas);
  context.clearRect(0, 0, canvas.width, canvas.height);
  // eslint-disable-next-line no-unused-vars
  selectedFigures.forEach((src, i) => {
    const figure = new Image();
    figure.src = src;
    context.drawImage(figure, 0, 0, canvas.width / dpr, canvas.height / dpr);
  });
}

// Download overlay figure
function downloadOverlay() {
  const canvas = document.getElementById('overlay-canvas');
  const downloadLink = document.createElement('a');
  downloadLink.download = 'overlay.png';
  downloadLink.href = canvas.toDataURL('image/png');
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  downloadLink.click();
}

// Clear all figures
function clearFigures() {
  const selectedFigures = getSelectedFigures();
  const canvas = document.getElementById('overlay-canvas');
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  selectedFigures.length = 0;
  setSelectedFigures(selectedFigures);
}

/* ------------------------------------------------------------------------- */
/* Navbar actions                                                            */

// Load a given 'state'
jQuery.fn.load_state = function loadState(page) {
  if (jQuery(this).attr('id') === undefined) {
    return;
  }
  jQuery('#main').load(page);
  jQuery(this).set_state();
};

// Set a given state in the menu
jQuery.fn.set_state = function setState() {
  if (jQuery(this).attr('id') === undefined) {
    return;
  }
  const id = jQuery(this).attr('id').substring(6);
  jQuery('#states').html(`${jQuery(this).attr('title')} <b class="caret"></b>`);
  jQuery('.state').removeClass('open');
  jQuery(this).toggleClass('open');
  window.location.hash = `#${id}`;
  jQuery('a.ifo-switch').each(function () {
    const oldurl = jQuery(this).attr('href');
    const oldhash = oldurl.split('#')[1];
    jQuery(this).attr('href', oldurl.replace(oldhash, id));
  });
};

// Fix width of fixed navbar
// eslint-disable-next-line no-unused-vars
function resetWidthOnResize() {
  jQuery('#nav').width(jQuery('#nav').width());
}

/* ------------------------------------------------------------------------- */
/* Document ready and loaded                                                 */

// Run when the document is ready
jQuery(window).load(function () {
  // compatibility of Bootstrap and jQuery UI elements
  jQuery.ui.dialog.prototype._focusTabbable = function () {};
  jQuery.fn.bootstrapBtn = jQuery.fn.button.noConflict();

  // re-position floating buttons
  const screenWidth = jQuery('header').width();
  const floatBtns = jQuery('.btn-float');
  if (screenWidth >= 992 && floatBtns.length > 1) {
    floatBtns.each(function (index) {
      this.css({ right: `${toString(90 + 60 * index)}px` });
    });
  }

  // shorten the date
  if (jQuery('#calendar').length) { shortenDate(); }

  // define inter-IFO links
  const thisbase = document.getElementsByTagName('base')[0].href;
  jQuery('[data-new-base]').each(function () {
    const newbase = `${jQuery(this).data('new-base')}/`;
    jQuery(this).attr('href', window.location.href.replace(thisbase, newbase));
  });

  // define the calendar
  jQuery('#calendar').datepicker({
    endDate: moment().utc().format('DD/MM/YYYY'),
    todayHighlight: true,
    todayBtn: 'linked',
  }).on('changeDate', moveToDate);

  // load correct run type
  if (window.location.hash.length > 1) {
    const hash = window.location.hash.substring(1);
    const path = `${window.location.pathname + hash}.html`;
    jQuery(`#state_${hash}`).load_state(path);
  }

  // load the fancybox
  jQuery('.fancybox').fancybox({
    selector: '[data-fancybox-group="images"]',
    nextEffect: 'none',
    prevEffect: 'none',
    width: 1200,
    loop: true,
    backFocus: false,
    iframe: { scrolling: 'no' },
    scrolling: 'no',
    beforeShow: resizeFancyboxIframe,
    helpers: {
      overlay: { locked: false },
      title: { type: 'inside' },
    },
  });

  // custom fancybox for stamp-pem bokeh plot
  jQuery('.fancybox-stamp').fancybox({
    width: 1000,
    height: 500,
    showNavArrows: false,
    padding: 0,
    title: this.title,
    href: jQuery(this).attr('href'),
    type: 'iframe',
  });

  // reposition dropdown if scrolling off the screen
  jQuery('.dropdown-toggle').click(function () {
    // if page width is small, no-operation
    if (jQuery(document).width() < 992) {
      return;
    }
    // otherwise add pull-right
    const target = jQuery(this).nextAll('.dropdown-menu');
    const dropleft = jQuery(this).offset().left;
    const dropwidth = target.width();
    const left = jQuery(window).width();
    const offright = (dropleft + dropwidth > left);
    if (offright) {
      target.addClass('pull-right');
    }
  });

  // set up dialog element
  jQuery('.dialog').dialog({
    autoOpen: false,
    draggable: false,
    height: 0.8 * jQuery(window).height(),
    width: 0.9 * jQuery(window).width(),
    modal: true,
    show: true,
    hide: true,
  });

  // click outside to close dialog
  jQuery('body').on('click', '.ui-widget-overlay', () => {
    jQuery('.dialog').dialog('close');
  });

  // open dialog
  jQuery('.btn-open').click(function () {
    const id = jQuery(this).data('id');
    jQuery(id).dialog('open');
  });

  // overlay actions
  jQuery('#overlay-figures').click(overlayFigures);
  jQuery('#download-overlay').click(downloadOverlay);
  jQuery('#clear-figures').click(clearFigures);
});

// After elements are loaded with AJAX, run this:
// eslint-disable-next-line no-unused-vars
jQuery(document).ajaxComplete((ev, xhr, settings) => {
  // custom tooltips
  jQuery('.fancybox').tooltip();
  jQuery('.fancybox-stamp').tooltip();
  jQuery('.icon-bar a').tooltip();
  jQuery('.btn-float').tooltip();
  jQuery('.btn').tooltip();

  // make figure elements draggable
  jQuery('.img-responsive').draggable({
    helper: 'clone',
    scroll: false,
    stack: '.img-responsive',
  });

  // handle figure drop events
  jQuery('#overlay-btn').droppable({
    accept: '.img-responsive',
    classes: { 'ui-droppable-active': 'ui-state-highlight' },
    tolerance: 'pointer',
    // eslint-disable-next-line no-unused-vars
    drop(evnt, ui) {
      ev.preventDefault();
      const selectedFigures = getSelectedFigures();
      const src = ui.draggable.attr('src');
      // if new, sort and append to selectedFigures
      if (selectedFigures.indexOf(src) === -1) {
        appendFigure(src, selectedFigures);
      }
    },
  });
});

jQuery(window).resize(() => {
  // set short month date
  if (jQuery('#calendar').length) { shortenDate(); }
});
