import http from 'http';
import assert from 'assert';
const mock = require('../SMTPServer/mockSMTP.js');

describe('Express Server', () => {
    let smtpServer;
    var app = require( '../lib/index.js');

    // Fire up fake SMTP server so we have something to send emails to.
    before(done => {
        smtpServer = mock.startMockSMTP(done);
    });


  it('should return 200', done => {
    let body = {mailOptions: {to:'to@localhost.com', subject:'Hello',text:'Hi'}};
    var post_options = {
        host: 'localhost',
        port: '3000',
        path: '/email.api/send',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
  
    var req = http.request(post_options, res => {
        res.setEncoding('utf8');
        
      assert.equal(200, res.statusCode);
      done();
    });
    req.write(JSON.stringify(body));
    req.end();
  });

  after(done => {
      app.stop();
      smtpServer.close(done);
  });
});
