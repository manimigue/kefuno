#!/bin/sh
# Credit: https://gist.github.com/willprice/e07efd73fb7f13f917ea

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_country_json_files() {
  # Current month and year, e.g: Apr 2018
  dateAndMonth=`date "+%b %Y"`
  # Stage the modified files in src/
  echo $dateAndMonth
  git add .
  # Create a new commit with a custom build message
  # with "[skip ci]" to avoid a build loop
  # and Travis build number for reference
  echo "before commit"
  git commit -m "Travis update: $dateAndMonth (Build $TRAVIS_BUILD_NUMBER)" -m "[skip ci]"
}

upload_files() {
  # Remove existing "origin"
  echo "bofore rm remote"
  git remote rm origin
  # Add new "origin" with access token in the git URL for authentication
  echo "before add remote"
  git remote add origin https://${GH_TOKEN}@github.com/manimigue/kefuno.git #> /dev/null 2>&1
  echo "before push"
  git push origin master --quiet
}

setup_git

commit_country_json_files

# Attempt to commit to git only if "git commit" succeeded
if [ $? -eq 0 ]; then
  echo "A new commit with changed country JSON files exists. Uploading to GitHub"
  upload_files
else
  echo "No changes in src. Nothing to do"
fi