const crypto = require('crypto');


class Util {
    constructor() {
        if (Util.exists) {
            return Util.instanse
        }

        Util.instanse = this
        Util.exists = true
    }

    generateSignature = (data) => {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'sect233k1'});
    
        const signature = crypto.createSign('SHA256')
            .update(data.toString())
            .end()
            .sign(privateKey);
    
        return { publicKey: publicKey.export({ format: "pem", type: "spki" }), signature }
    }
}

module.exports = new Util()