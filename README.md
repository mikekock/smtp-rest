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
