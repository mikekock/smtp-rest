const mock = require('./mockSMTP.js');

mock.startMockSMTP(() => console.log('mockSMTP app listening on port 4000!!'));
