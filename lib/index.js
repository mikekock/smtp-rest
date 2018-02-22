const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const config = require('./config.json');
const nodemailer = require('nodemailer');

function sendEmail(transporterOptions, mailOptions, result) {
     // create reusable transporter object using the default SMTP transport
     let transporter = nodemailer.createTransport(transporterOptions);

     // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        result({error, info});
    });
}

function handleSendEmail(req, res) {
    let transporterOptions = config.transporterOptions;
    if (transporterOptions in req.body) {
        transporterOptions = req.body.transporterOptions;
    }
    
    let mailOptions = req.body.mailOptions;
    let from = mailOptions.from;
    if (from == null) {
        mailOptions.from = config.from;
    }

    let sendResult = function(result) {
        if (result.error) {
            res.statusCode = 500;
            console.log(result.error);
        }
        res.json(result);
    }

    sendEmail(transporterOptions, mailOptions, sendResult);
}
app.use(bodyParser.json()); // for parsing application/json
app.post(config.urlPrefix + '/send/', handleSendEmail)

let server = app.listen(3000, () => console.log('smtp-rest app listening on port 3000!!'));

// Expose so unit tests can shut server down on completion.
function stop() {
    server.close();
  }
  
  module.exports = server;
  module.exports.stop = stop;