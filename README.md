# Testing
## Command Line
```
curl -X POST -d '{"mailOptions": "from":from@locahost, "to":"to@localhost", "subject":"Hello", "test":"Hi"}'  http://localhost:3000/email.api/send
```