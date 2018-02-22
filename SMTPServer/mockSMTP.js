
module.exports = {
    startMockSMTP: function(done) {
        const SMTPServer = require('smtp-server').SMTPServer;
        let options = {
            authOptional: true,
            onMailFrom(address, session, callback){
                if(address.address !== 'from@localhost.com'){
                    return callback(new Error('Only from@localhost.com is allowed to send mail'));
                }
                return callback(); // Accept the address
            },
            onRcptTo(address, session, callback){
                if(address.address !== 'to@localhost.com'){
                    return callback(new Error('Only to@localhost.com is allowed to receive mail'));
                }
                server.close();
                return callback(); // Accept the address
            }
        }
        const server = new SMTPServer(options);

        server.listen(4000, done);

        return server;
    }
}