const config = require('config');
const postman = require("postman");
const namespace = {
    noti: "noti_service",
    shop: "shop_service",
    local: "local"
};
const NATS_HOST = config.get('nats.host');
const NATS_PORT = config.get('nats.port');

let pcNoti = postman.createClient({'url': `nats://${NATS_HOST}:${NATS_PORT}`}, namespace.noti);
let pcShop = postman.createClient({'url': `nats://${NATS_HOST}:${NATS_PORT}`}, namespace.shop);
let pcLocal = postman.createClient({'url': `nats://${NATS_HOST}:${NATS_PORT}`}, namespace.local);

module.exports = {pcNoti, pcShop, pcLocal};