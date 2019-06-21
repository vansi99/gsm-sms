const port = require("../services/modem");
const { pcLocal } = require("../services/nats");
const punycode = require("punycode");

function convertToHex(str) {
    let hex = '';
    for(let i=0;i<str.length;i++) {
        hex += ''+str.charCodeAt(i).toString(16);
    }
    return hex;
}

function toUCS2(code) {
    function toPaddedHexString(num, len) {
        const str = num.toString(16).toUpperCase();
        return '0'.repeat(len - str.length) + str;
    }
    const hexers = punycode.ucs2.decode(code);
    let ucs2str = '';
    hexers.forEach((i) => {
        ucs2str += toPaddedHexString(i, 4);
    });
    return ucs2str;
}

pcLocal.subscribe("sms-service.sms.send", async (msg) => {
    let { to, message } = msg;
    message = toUCS2(message);
    to = toUCS2(to);
    port.write(`AT+CSCS="UCS2"\r`);
    port.write('AT+CMGF=1\r');
    port.write(`AT+CMGS="${to}"\r`);
    port.write(message);
    port.write(Buffer([0x1A]));
    port.write('^z');
});

