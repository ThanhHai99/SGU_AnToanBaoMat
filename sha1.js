(() => {
  let crypt = require('crypt'), utf8 = require('charenc').utf8, bin = require('charenc').bin,

  // The core
  sha1 = (message) => {
    // Convert to byte array
    if (message.constructor == String)
      message = utf8.stringToBytes(message);
    else if (typeof Buffer !== 'undefined' && typeof Buffer.isBuffer == 'function' && Buffer.isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();

    console.log("Step 1");
    console.log(message);

    // otherwise assume byte array
    let m  = crypt.bytesToWords(message);
    let l  = message.length * 8;
    let w  = [];
    let H0 =  1732584193;
    let H1 = -271733879;
    let H2 = -1732584194;
    let H3 =  271733878;
    let H4 = -1009589776;

    // Padding
    m[l >> 5] |= 0x80 << (24 - l % 32);
    m[((l + 64 >>> 9) << 4) + 15] = l;

    console.log(m);

    for (let i = 0; i < m.length; i += 16) {
      let a = H0, b = H1, c = H2, d = H3, e = H4;
      for (let j = 0; j < 80; j++) {
        if (j < 16) w[j] = m[i + j];
        else {
          let n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
          w[j] = (n << 1) | (n >>> 31);
        }
        let t = ((H0 << 5) | (H0 >>> 27)) + H4 + (w[j] >>> 0) + ( j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 : j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 : j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 : (H1 ^ H2 ^ H3) - 899497514)
        H4 = H3; H3 = H2; H2 = (H1 << 30) | (H1 >>> 2); H1 = H0; H0 = t;
      }
      H0 += a; H1 += b; H2 += c; H3 += d; H4 += e;
    }
    return [H0, H1, H2, H3, H4];
  },

  // Public API
  api = (message, options) => {
    let digestbytes = crypt.wordsToBytes(sha1(message));
    // return (options && options.asBytes) ? digestbytes : (options && options.asString) ? bin.bytesToString(digestbytes) : crypt.bytesToHex(digestbytes);
    return crypt.bytesToHex(digestbytes);
  };

  api._blocksize = 16;
  api._digestsize = 20;

  module.exports = api;
})();