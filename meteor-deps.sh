# These are all the meteor-related NPM commands we ran

# Step 1:
meteor add-platform ios
meteor add-platform android

meteor remove blaze-html-templates
meteor add angular-templates

meteor add dab0mb:ionic-assets
meteor npm install angular@^1.5.8 --save
meteor npm install angular-animate@^1.5.8 --save
meteor npm install angular-sanitize@^1.5.8 --save
meteor npm install angular-ui-router@^0.3.1 --save
meteor npm install ionic-scripts --save
meteor npm install babel-runtime --save

meteor add mobile-status-bar
meteor add launch-screen

meteor npm install angular-meteor --save

# Step 2:
meteor npm install angular-ecmascript --save
meteor npm install moment --save
meteor add fourseven:scss

# Step 3:
# (Nothing)

# Step 4:
meteor npm install angular-moment --save

meteor add check

# Step 5 (modified from phone-based auth to password-based auth)
meteor add accounts-password
meteor npm install angular-meteor-auth

meteor npm install --save bcrypt

# Step 6
meteor remove insecure
