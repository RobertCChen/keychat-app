# This command launches Chrome on OS X with "Web security" disabled, which disables CORS.
# This way, our Meteor web app can send HTTP requests from our local browsers to keybase.io
open -n -a /Applications/Google\ Chrome.app --args --user-data-dir="/tmp/someFolderName" --disable-web-security
