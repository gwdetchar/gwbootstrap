#!/bin/bash -l

SCSS="stylelint --quiet sass/*.scss"
JS="eslint --quiet js/*.js"

# loop over and execute linters
declare -a Linters=("${SCSS}" "${JS}")
for CMD in "${Linters[@]}"; do
    echo ${CMD}
    eval ${CMD}
done
