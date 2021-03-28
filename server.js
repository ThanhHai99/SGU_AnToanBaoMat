;
class SHA1 {
    constructor(plaintext) {
        this._plaintext = plaintext;
    }
    get plaitext() {
        return this._plaintext;
    }
    set plaintext(plaintext) {
        this._plaintext = plaintext;
    }
    ;
    encode() {
        return "";
    }
    ;
    compare() {
        return "";
    }
    ;
}
;
let p1 = new SHA1("thanhhai");
console.log(p1.encode());
console.log(p1.compare());
