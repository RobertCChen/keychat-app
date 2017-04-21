#!/bin/bash
set -e

scriptdir=$(cd $(dirname $0); pwd -P)

cd $scriptdir/src/
meteor npm install --save babel-runtime angular-animate angular-meteor angular-sanitize angular-ui-router ionic-scripts angular angular-ecmascript moment
