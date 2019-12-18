# Bootstrap for GW Observatories

This repository provides extensions to the standard
[bootstrap-4.x](//github.com/twbs/bootstrap/) styling, with specific
applications for the [GW-DetChar](//github.com/gwdetchar/gwdetchar/) and
[GWSumm](//github.com/gwpy/gwsumm) suite of detector characterisation tools.

This collection of cascading style sheets (CSS) and JavaScript utilities
is designed to represent the global network of ground-based
gravitational wave observatories, with explicit style support for:

  - [LIGO-Hanford](https://www.ligo.caltech.edu/WA) (H1: Washington, U.S.A.)
  - [LIGO-Livingston](https://www.ligo.caltech.edu/LA) (L1: Louisiana, U.S.A.)
  - [Virgo](http://www.virgo-gw.eu) (V1: Italy)
  - [GEO600](https://www.geo600.org) (G1: Germany)
  - [KAGRA](https://gwcenter.icrr.u-tokyo.ac.jp/en/) (K1: Japan)
  - [LIGO-India](https://www.ligo-india.in) (I1: Maharashtra, India)

[![npm version](https://badge.fury.io/js/gwbootstrap.svg)](https://badge.fury.io/js/gwbootstrap)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/gwbootstrap/badge)](https://www.jsdelivr.com/package/npm/gwbootstrap)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3483879.svg)](https://doi.org/10.5281/zenodo.3483879)

## Installation

GW-Bootstrap can be installed server-side with
[`npm`](https://www.npmjs.com/get-npm):

```bash
npm install --save-dev gwbootstrap
```

## Using jsDelivr

However, the easiest way to import stylesheets and scripts is through the
content delivery network [`jsDelivr`](https://jsdelivr.com). Simply include the
following lines somewhere near the end of the `<head>` metadata elements
in your HTML:

```html
<link href="https://cdn.jsdelivr.net/npm/gwbootstrap@<version>/lib/gwbootstrap.min.css" rel="stylesheet" media="all">
<script src="https://cdn.jsdelivr.net/npm/gwbootstrap@<version>/lib/gwbootstrap.min.js" type="text/javascript"></script>
```

where `<version>` is the semantic version number, e.g. 1.2.0.

A heavier collection of more interactive features, including calendar
view and a figure overlay tool, is available from the `gwbootstrap-extra`
script:

```html
<script src="https://cdn.jsdelivr.net/npm/gwbootstrap@<version>/lib/gwbootstrap-extra.min.js" type="text/javascript"></script>
```

## Dependencies

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
<td>jquery-3.4.1<br>
jquery-lazy-1.7.10<br>
bootstrap-4.4.1<br>
fancybox-3.5.7<br>
gwbootstrap.min.js</td>
<td>jquery-3.4.1<br>
jquery-ui-1.12.1<br>
moment.js-2.24.0<br>
bootstrap-4.4.1<br>
fancybox-3.5.7<br>
bootstrap-datepicker-1.9.0<br>
gwbootstrap-extra.min.js</td>
</tr>
</tbody>
</table>

## Usage

The primary advantage of `gwbootstrap` is that it provides
interferometer-specific color styling for navbars, buttons,
cards, and alerts through the following classes:

<table style="width: 100%;">
<colgroup>
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>IFO</strong></td>
<td><strong>Navbar</strong></td>
<td><strong>Button</strong></td>
<td><strong>Card</strong></td>
<td><strong>Alert</strong></td>
</tr>
<tr class="even">
<td>H1</td>
<td>navbar-h1</td>
<td>btn-h1</td>
<td>card-h1</td>
<td>alert-h1</h1>
</tr>
<tr class="odd">
<td>L1</td>
<td>navbar-l1</td>
<td>btn-l1</td>
<td>card-l1</td>
<td>alert-l1</td>
</tr>
<tr class="even">
<td>V1</td>
<td>navbar-v1</td>
<td>btn-v1</td>
<td>card-v1</td>
<td>alert-v1</td>
</tr>
<tr class="odd">
<td>G1</td>
<td>navbar-g1</td>
<td>btn-g1</td>
<td>card-g1</td>
<td>alert-g1</td>
</tr>
<tr class="even">
<td>K1</td>
<td>navbar-k1</td>
<td>btn-k1</td>
<td>card-k1</td>
<td>alert-k1</td>
</tr>
<tr class="odd">
<td>I1</td>
<td>navbar-i1</td>
<td>btn-i1</td>
<td>card-i1</td>
<td>alert-i1</td>
</tr>
<tr class="even">
<td>Network</td>
<td>navbar-network</td>
<td>btn-network</td>
<td>card-network</td>
<td>alert-network</td>
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
