

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
}

module.exports = new Util()