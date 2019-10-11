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

However, the easiest way to import stylesheets and scripts is through the
content delivery network `cdnjs`_. Simply include the following lines somewhere
near the end of the :code:`<head>` metadata elements in your HTML:

.. code-block:: html

   <link href="//cdnjs.cloudflare.com/ajax/libs/gwbootstrap/<release>/css/gwbootstrap.min.css" rel="stylesheet" media="all">
   <script src="//cdnjs.cloudflare.com/ajax/libs/gwbootstrap/<release>/js/gwbootstrap.min.css" type="text/javascript"></script>

where :code:`<version>` is the semantic version number, e.g. 1.0.0. If you
require only the lightweight script elements, and do not need calendars or
other heavier interactive features, please use the :code:`gwbootstrap-basic`
script:

.. code-block:: html

   <script src="//cdnjs.cloudflare.com/ajax/libs/gwbootstrap/<release>/js/gwbootstrap-basic.min.css" type="text/javascript"></script>

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
