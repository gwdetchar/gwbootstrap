#!/bin/bash -l

BUILDDIR="min"
mkdir -p ${BUILDDIR}

# JavaScript files
LIGHTJS="js/gwbootstrap-basic.js"
EXTRAJS="js/gwbootstrap-extra.js"
LIGHTJS_OUT="${BUILDDIR}/gwbootstrap-basic.min.js"
EXTRAJS_OUT="${BUILDDIR}/gwbootstrap.min.js"

# (S)CSS files
CSSIN="sass/gwbootstrap.scss"
CSSOUT="${BUILDDIR}/gwbootstrap.min.css"

# get babel and sass commands
BABELCMD="babel --no-comments --compact --minified"
CMD1="${BABELCMD} --out-file ${LIGHTJS_OUT} ${LIGHTJS}"
CMD2="${BABELCMD} --out-file ${EXTRAJS_OUT} ${LIGHTJS} ${EXTRAJS}"
CMD3="sass --style compressed ${CSSIN} ${CSSOUT}"

# build minified stylesheets and scripts
declare -a Commands=("${CMD1}" "${CMD2}" "${CMD3}")
for CMD in "${Commands[@]}"; do
    echo ${CMD};
    eval ${CMD};
done
