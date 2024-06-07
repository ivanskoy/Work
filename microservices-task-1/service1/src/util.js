const crypto = require('crypto')

class Util {
    constructor() {
        if (Util.exists) {
            return Util.instanse
        }

        Util.instanse = this
        Util.exists = true
    }

    random = (min, max) => {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);

        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
    }

    verifySignature = (data, signature, publicKey) => {
        const verify = crypto.createVerify('SHA256')
            .update(data.toString())
            .end();

        return verify.verify(publicKey, signature)
    }
}

module.exports = new Util()