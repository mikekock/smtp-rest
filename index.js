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
        result({error, info});
    });
}

handleSendEmail = function(req, res) {
    let transporterOptions = config.transporterOptions;
    if (transporterOptions in req.body) {
        transporterOptions = req.body.transporterOptions;
    }
    
    let sendResult = function(result) {
        res.json(result);
    }
    sendEmail(transporterOptions, req.body.mailOptions, sendResult);
}
app.use(bodyParser.json()); // for parsing application/json
app.post(config.urlPrefix + '/send/', handleSendEmail)

app.listen(3000, () => console.log('smtp-rest app listening on port 3000!'));