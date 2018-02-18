const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const config = require('./config.json');
const nodemailer = require('nodemailer');

sendEmail = function(transporterOptions, mailOptions, result) {
     // create reusable transporter object using the default SMTP transport
     let transporter = nodemailer.createTransport(transporterOptions);

     // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            result(error);
        }
        else {
            result(info);
        }
    });
}

sendResponse = function(res, result) {
    res.json(result);
}

handleSendEmail = function(req, res) {
    let transporterOptions = config.transporterOptions;
    if (transporterOptions in req.body) {
        transporterOptions = req.body.transporterOptions;
    }
    
    let sendResult = function(result) {
        sendResponse(res, result);
    }
    sendEmail(transporterOptions, req.body.mailOptions, sendResult);
}
app.use(bodyParser.json()); // for parsing application/json
app.post(config.urlPrefix + '/send/', handleSendEmail)

app.listen(3000, () => console.log('smtp-rest app listening on port 3000!'));