##############################
Bootstrap for GW Observatories
##############################

This repository provides extensions to the standard `bootstrap-3.x`_ styling,
with specific applications for the `GW-DetChar`_ and `GWSumm`_ suite of
detector characterisation tools.

This collection of cascading style sheets (CSS) and JavaScript utilities
is designed to represent the global network of ground-based gravitational
wave observatories, with explicit style support for:

* `LIGO-Hanford`_ (Washington, U.S.A.)
* `LIGO-Livingston`_ (Louisiana, U.S.A.)
* `Virgo`_ (Italy)
* `GEO600`_ (Germany)
* `KAGRA`_ (Japan)
* `LIGO-India`_ (Maharashtra, India)

------------
Installation
------------

GW-Bootstrap can be installed server-side with `npm`_:

.. code:: bash

   npm install --save-dev gwbootstrap

-----
Usage
-----

However, the easiest way to import stylesheets and scripts is through the
content delivery network `cdnjs`_. Simply include the following lines somewhere
near the end of the :code:`<head>` metadata elements in your HTML:

.. code-block:: html

   <link href="//cdnjs.cloudflare.com/ajax/libs/gwbootstrap/<version>/css/gwbootstrap.min.css" rel="stylesheet" media="all">
   <script src="//cdnjs.cloudflare.com/ajax/libs/gwbootstrap/<version>/js/gwbootstrap.min.css" type="text/javascript"></script>

where :code:`<version>` is the semantic version number, e.g. 1.0.0.

A heavier collection of more interactive features, including calendar view and
a figure overlay tool, is available from the :code:`gwbootstrap-extra` script:

.. code-block:: html

   <script src="//cdnjs.cloudflare.com/ajax/libs/gwbootstrap/<version>/js/gwbootstrap-extra.min.css" type="text/javascript"></script>

The following table shows recommended package dependencies for stylesheets and
JavaScript elements, depending on use case (note: import order is important).

+----------------+----------------------+----------------------------+
|                | **with gwbootstrap** | **with gwbootstrap-extra** |
+----------------+----------------------+----------------------------+
|     **CSS**    | gwbootstrap.min.css  |     gwbootstrap.min.css    |
+----------------+----------------------+----------------------------+
|                |                      |        jquery-3.4.1        |
|                |                      |      jquery-ui-1.12.1      |
|                |     jquery-3.4.1     |      moment.js-2.24.0      |
| **JavaScript** |   bootstrap-3.4.1    |   moment-timezone-0.5.26   |
|                |    fancybox-3.5.7    |       bootstrap-3.4.1      |
|                |  gwbootstrap.min.js  |       fancybox-3.5.7       |
|                |                      | bootstrap-datepicker-1.9.0 |
|                |                      |  gwbootstrap-extra.min.js  |
+----------------+----------------------+----------------------------+

------------
Contributing
------------

All code should follow the `Sass Guidelines`_ and `Airbnb JavaScript Style
Guide`_ for consistency. Users may use the `stylelint`_ CSS linter to check
their stylesheets and `eslint`_ to parse JavaScript for issues before
submitting.

The `contributions guide`_ outlines our recommended procedure for proposing
additions and making and testing changes.

.. _bootstrap-3.x: //github.com/twbs/bootstrap/
.. _GW-DetChar: //github.com/gwdetchar/gwdetchar/
.. _GWSumm: //github.com/gwpy/gwsumm/
.. _npm: https://www.npmjs.com/get-npm
.. _cdnjs: https://cdnjs.com
.. _Sass Guidelines: https://sass-guidelin.es
.. _Airbnb JavaScript Style Guide: //github.com/airbnb/javascript
.. _stylelint: https://stylelint.io
.. _eslint: https://eslint.org
.. _contributions guide: //github.com/gwdetchar/gwbootstrap/blob/master/CONTRIBUTING.md

.. _LIGO-Hanford: https://www.ligo.caltech.edu/WA
.. _LIGO-Livingston: https://www.ligo.caltech.edu/LA
.. _Virgo: http://www.virgo-gw.eu
.. _GEO600: https://www.geo600.org
.. _KAGRA: https://gwcenter.icrr.u-tokyo.ac.jp/en/
.. _LIGO-India: https://www.ligo-india.in
