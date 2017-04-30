# keychat

Built starting from the Angular Meteor template [here](https://angular-meteor.com/tutorials/whatsapp/meteor/bootstrapping)

To install dependencies:

    meteor npm install

To run:

    meteor

...the app will be running on [localhost:3000](http://localhost:3000).

## TODOs

 0. Try to use libkeybase-js

## Roadmap

 0. Figure out Keybase key management: How do we avoid users copying & pasting keys?
 1. Basic chat app (no encryption, but add accounts and passwords so we can later decrypt Keybase key w/ password)
 2. Add encryption with dummy public keys
 3. Add lookup public keys against Keybase root
 4. Verify Keybase root before allowing lookups on it
