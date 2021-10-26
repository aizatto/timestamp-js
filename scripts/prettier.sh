#!/bin/sh

cd $(dirname "$0")/..

program=$(basename "$0")

case $1 in
"help")
  echo "$program <commahd>"
  echo
  echo "Examples:"
  echo
  echo "  $program        Prettifies only modified files. Includes both staged and unstaged."
  echo "  $program all    Prettifies all files"
  echo "  $program staged Preffifies only staged files"
  echo "  $program help   Displays this help"
  ;;
"all")
  ./node_modules/.bin/prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}"
  ;;
"staged")
  git diff --diff-filter=ACMR --name-only --staged HEAD |
    grep -E "^.*\.(js|jsx|ts|tsx|json|css|scss|md)" |
    xargs ./node_modules/.bin/prettier --write
  ;;
*)
  git diff --diff-filter=ACMR --name-only HEAD |
    grep -E "^.*\.(js|jsx|ts|tsx|json|css|scss|md)" |
    xargs ./node_modules/.bin/prettier --write
  ;;
esac