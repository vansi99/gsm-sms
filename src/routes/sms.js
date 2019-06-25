const port = require("../services/modem");
const { pcLocal } = require("../services/nats");
const punycode = require("punycode");


pcLocal.subscribe("sms-service.sms.send", async (msg) => {
    let { to, message } = msg;
    port.write('AT+CMGF=1\r');
    port.write(`AT+CMGS="${to}"\r`);
    port.write(message);
    port.write(Buffer([0x1A]));
    port.write('^z');
});

