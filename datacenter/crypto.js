class Crypto {
    constructor() {

    }

    static genId(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static zip(array) {
        let bundle = [];
        array.forEach(element => {
            let keys = Object.keys(element);
            let _object = [];
            keys.forEach((key) => {
                if (element[key] != '' && element[key] != null) {
                    _object.push({
                        name: (key == "time") ? "date" : key,
                        value: element[key]
                    });
                }
            });
            bundle.push(_object);
        });

        return bundle;
    }
}

module.exports = Crypto;