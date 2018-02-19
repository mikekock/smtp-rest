# Testing
## Command Line
```
curl -X POST -d '{"mailOptions": {"from":"from@localhost.com", "to":"to@localhost.com", "subject":"Hello","test":"Hi"}}'  -H "Content-Type: application/json" http://localhost:3000/email.api/send
```