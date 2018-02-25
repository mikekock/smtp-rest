/* eslint-env mocha */
import http from 'http';

import assert from 'assert';

const mock = require('./SMTPServer/mockSMTP.js');

const app = require('../lib/index.js');

describe('Express Server', () => {
  let smtpServer;

  // Fire up fake SMTP server so we have something to send emails to.
  before((done) => {
    smtpServer = mock.startMockSMTP(done);
  });

  it('should return 200', (done) => {
    const body = { mailOptions: { to: 'to@localhost.com', subject: 'Hello', text: 'Hi' } };
    const postOptions = {
      host: 'localhost',
      port: '3000',
      path: '/email.api/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(postOptions, (res) => {
      res.setEncoding('utf8');
      assert.equal(200, res.statusCode);
      done();
    });
    req.write(JSON.stringify(body));
    req.end();
  });

  after((done) => {
    app.stop();
    smtpServer.close(done);
  });
});
