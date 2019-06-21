const SerialPort = require("serialport");
let port = new SerialPort("/dev/ttyUSB0", {
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    autoDeleteOnReceive: true,
    enableConcatenation: true,
    incomingCallIndication: true,
    incomingSMSIndication: true,
    pin: '',
    customInitCommand: '',
    logger: console
});

String.prototype.hexEncode = function () {
    let hex, i;

    let result = "";
    for (i = 0; i < this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000" + hex).slice(-4);
    }

    return result
};

async function connect() {
    return new Promise((resolve) => {

        port.on("open", () => {
            console.log('Serial communication open');
            port.write("AT\r");

            port.on('data', (data) => {
                console.log("Received data: " + data);
                resolve(port);
            });
        });
    })
}

connect().then(res => port = res);

module.exports = port;