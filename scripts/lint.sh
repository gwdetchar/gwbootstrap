#!/bin/bash -l

SCSS="npx stylelint --quiet sass/*.scss"
JS="npx eslint --quiet js/*.js"

# loop over and execute linters
declare -a Linters=("${SCSS}" "${JS}")
for CMD in "${Linters[@]}"; do
    echo ${CMD}
    eval ${CMD}
done
