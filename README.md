# Bootstrap for GW Observatories

This repository provides extensions to the standard
[bootstrap-3.x](//github.com/gwdetchar/bootstrap/) styling, with specific
applications for the [GW-DetChar](//github.com/gwdetchar/gwdetchar/) and
[GWSumm](//github.com/gwpy/gwsumm) suite of detector characterisation tools.

This collection of cascading style sheets (CSS) and JavaScript utilities
is designed to represent the global network of ground-based
gravitational wave observatories, with explicit style support for:

  - [LIGO-Hanford](https://www.ligo.caltech.edu/WA) (Washington, U.S.A.)
  - [LIGO-Livingston](https://www.ligo.caltech.edu/LA) (Louisiana, U.S.A.)
  - [Virgo](http://www.virgo-gw.eu) (Italy)
  - [GEO600](https://www.geo600.org) (Germany)
  - [KAGRA](https://gwcenter.icrr.u-tokyo.ac.jp/en/) (Japan)
  - [LIGO-India](https://www.ligo-india.in) (Maharashtra, India)

[![npm version](https://badge.fury.io/js/gwbootstrap.svg)](https://badge.fury.io/js/gwbootstrap)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3483879.svg)](https://doi.org/10.5281/zenodo.3483879)

## Installation

GW-Bootstrap can be installed server-side with
[`npm`](https://www.npmjs.com/get-npm):

```bash
npm install --save-dev gwbootstrap
```

## Usage

However, the easiest way to import stylesheets and scripts is through the
content delivery network [`cdnjs`](https://cdnjs.com). Simply include the
following lines somewhere near the end of the `<head>` metadata elements
in your HTML:

```html
<link href="//cdnjs.cloudflare.com/ajax/libs/gwbootstrap/<version>/css/gwbootstrap.min.css" rel="stylesheet" media="all">
<script src="//cdnjs.cloudflare.com/ajax/libs/gwbootstrap/<version>/js/gwbootstrap.min.css" type="text/javascript"></script>
```

where `<version>` is the semantic version number, e.g. 1.0.0.

A heavier collection of more interactive features, including calendar
view and a figure overlay tool, is available from the
`gwbootstrap-extra` script:

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/gwbootstrap/<version>/js/gwbootstrap-extra.min.css" type="text/javascript"></script>
```

The following table shows recommended package dependencies for
stylesheets and JavaScript elements, depending on use case (note: import
order is important).

<table style="width:86%;">
<colgroup>
<col style="width: 21%" />
<col style="width: 28%" />
<col style="width: 36%" />
</colgroup>
<tbody>
<tr class="odd">
<td></td>
<td><strong>with gwbootstrap</strong></td>
<td><strong>with gwbootstrap-extra</strong></td>
</tr>
<tr class="even">
<td><strong>CSS</strong></td>
<td>gwbootstrap.min.css</td>
<td>gwbootstrap.min.css</td>
</tr>
<tr class="odd">
<td><strong>JavaScript</strong></td>
<td><p>jquery-3.4.1</p>
<p>jquery-lazy-1.7.9</p>
<p>bootstrap-3.4.1</p>
<p>fancybox-3.5.7</p>
<p>gwbootstrap.min.js</p></td>
<td><p>jquery-3.4.1</p>
<p>jquery-ui-1.12.1</p>
<p>moment.js-2.24.0</p>
<p>moment-timezone-0.5.26</p>
<p>bootstrap-3.4.1</p>
<p>fancybox-3.5.7</p>
<p>bootstrap-datepicker-1.9.0</p>
<p>gwbootstrap-extra.min.js</p></td>
</tr>
</tbody>
</table>

# Contributing

All code should follow the [Sass Guidelines](https://sass-guidelin.es) and
[Airbnb JavaScript Style Guide](//github.com/airbnb/javascript) for
consistency. Users may use the [stylelint](https://stylelint.io) CSS linter
to check their stylesheets and [eslint](https://eslint.org) to parse
JavaScript for issues before submitting.

The
[contributions guide](//github.com/gwdetchar/gwbootstrap/blob/master/CONTRIBUTING.md)
outlines our recommended procedure for proposing additions and making and
testing changes.
