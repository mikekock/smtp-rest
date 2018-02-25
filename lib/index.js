const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.json');
const nodemailer = require('nodemailer');

const app = express();

function sendEmail(transporterOptions, mailOptions, result) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport(transporterOptions);

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    result({ error, info });
  });
}

function overrideTransporterOptions(req) {
  let result;
  if (req.body.transporterOptions) {
    const { transporterOptions } = req.body;
    result = transporterOptions;
  }
  return result;
}

function handleSendEmail(req, res) {
  let { transporterOptions } = config;
  const overrideTransport = overrideTransporterOptions(req);
  if (overrideTransport) {
    transporterOptions = overrideTransport;
  }

  const { mailOptions } = req.body;
  const { from } = mailOptions;
  if (from == null) {
    mailOptions.from = config.from;
  }

  function sendResult(result) {
    if (result.error) {
      res.statusCode = 500;
      console.log(result.error);
    }
    res.json(result);
  }

  sendEmail(transporterOptions, mailOptions, sendResult);
}
app.use(bodyParser.json()); // for parsing application/json
app.post(`${config.urlPrefix}/send/`, handleSendEmail);

const server = app.listen(3000, () => console.log('smtp-rest app listening on port 3000!!'));

// Expose so unit tests can shut server down on completion.
function stop() {
  server.close();
}

module.exports = server;
module.exports.stop = stop;
