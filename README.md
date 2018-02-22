# Usage
This REST service is based around the nodemailer node library. The expected JSON body on the /send POST 
mirrors the data structures for nodemailer. The transporterOptions element is optional and the lib/config.js
version will be used by default. mailOptions.from is also optional. If not specified the from value in
lib/config.js will be used instead.

lib/config.json contains the defaults for sending emails. A default transport and a default from address can be setup which 
allows clients to not have to worry about these settings if they don't want to. However those values can still specify
those values in the posted body if required to override.


# Production Build
```
npm build
npm serve
```
# Testing
## Command Line
Start up server and reload on source change and call endpoint with test data.
```
node SMTPServer/runMockSMTP.js&
npm start

curl -X POST -d '{"mailOptions": {"from":"from@localhost.com", "to":"to@localhost.com", "subject":"Hello","text":"Hi"}}'  -H "Content-Type: application/json" http://localhost:3000/email.api/send

fg
[Ctrl-c]
```

## Tests
```
npm test
```
