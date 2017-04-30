# These are all the meteor-related NPM commands we ran

# Step 1:
meteor add-platform ios
meteor add-platform android

meteor remove blaze-html-templates
meteor add angular-templates

meteor add dab0mb:ionic-assets
meteor npm install --save angular@^1.5.8
meteor npm install --save angular-animate@^1.5.8
meteor npm install --save angular-sanitize@^1.5.8
meteor npm install --save angular-ui-router@^0.3.1
meteor npm install --save ionic-scripts
meteor npm install --save babel-runtime

meteor add mobile-status-bar
meteor add launch-screen

meteor npm install --save angular-meteor

# Step 2:
meteor npm install --save angular-ecmascript
meteor npm install --save moment
meteor add fourseven:scss

# Step 3:
# (Nothing)

# Step 4:
meteor npm install --save angular-moment

meteor add check

# Step 5: (modified from phone-based auth to password-based auth)
meteor add accounts-password
meteor npm install --save angular-meteor-auth

meteor npm install --save bcrypt

# Step 6:
meteor remove insecure

# Step 7:
meteor remove autopublish
meteor add reywood:publish-composite

# Step 8:
meteor add okland:camera-ui

# ----- Keychat dev starts here -------

# NOWORKIE
#meteor npm install -g --save node-gyp
#meteor npm install --save meteor-node-stubs
#meteor npm install --save scrypt

# NOWORKIE
#meteor npm install --save scrypt-hash

meteor npm install --save js-scrypt
