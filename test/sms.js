const postman = require("postman");
const namespace = {
    local: "local"
};
const NATS_HOST = "127.0.0.1";
const NATS_PORT = "4222";

let pcLocal = postman.createClient({'url': `nats://${NATS_HOST}:${NATS_PORT}`}, namespace.local);
const data = {
    message: "ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttrtttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
    to: "+84966823635"
};

pcLocal.publish("sms-service.sms.send", data);
