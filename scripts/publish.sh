#!/bin/bash

function fatal() {
  local code=$1
  local message=$2
  echo $message >&2
  exit $code
}

yarn pack && tar -zxf package.tgz -C gh-repo --strip-components=1 || fatal 2 'pack to gh-repo failed'
COMMIT=$(git describe --always --dirty)

cd gh-repo
git add .  && git commit -m "bump version:${npm_package_version} revision:${COMMIT}" && git push || fatal 4 'git commit changes failed'
