#!/bin/bash -l

result=0
TESTDIR="test"
mkdir -p ${TESTDIR}

# JavaScript files
LIGHTJS="js/gwbootstrap.js"
EXTRAJS="js/gwbootstrap-extra.js"
LIGHTJS_OUT="${TESTDIR}/gwbootstrap.min.js"
EXTRAJS_OUT="${TESTDIR}/gwbootstrap-extra.min.js"

# (S)CSS files
CSSIN="sass/gwbootstrap.scss"
CSSOUT="${TESTDIR}/gwbootstrap.min.css"

# get babel and sass commands
BABELCMD="babel --no-comments --compact --minified"
CMD1="${BABELCMD} --out-file ${LIGHTJS_OUT} ${LIGHTJS}"
CMD2="${BABELCMD} --out-file ${EXTRAJS_OUT} ${LIGHTJS} ${EXTRAJS}"
CMD3="sass --style compressed ${CSSIN} ${CSSOUT}"

# build minified stylesheets and scripts
declare -a Commands=("${CMD1}" "${CMD2}" "${CMD3}")
for CMD in "${Commands[@]}"; do
    echo ${CMD}
    eval ${CMD}
done

# compare against the current minified files
for file_ in $(ls ${TESTDIR}); do
    reference="min/$(basename ${file_})"
    eval "cmp -s ${TESTDIR}/${file_} ${reference}"
    code=$?
    result=$((result + code))
    if (( code > 0 )); then
        echo "File ${reference} has changed"
    fi
done

if (( result > 0 )); then
    echo "Please update minified files with:"
    echo "npm run build"
    exit ${result}
fi
