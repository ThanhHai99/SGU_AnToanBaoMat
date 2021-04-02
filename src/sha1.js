const utils = require('./utils');

function sha1(text) {
    //constants used later during the hashing function
    let h0 = '01100111010001010010001100000001'; //67452301 (hex)
    let h1 = '11101111110011011010101110001001'; //EFCDAB89 (hex)
    let h2 = '10011000101110101101110011111110'; //98BADCFE (hex)
    let h3 = '00010000001100100101010001110110'; //10325476 (hex)
    let h4 = '11000011110100101110000111110000'; //C3D2E1F0 (hex)

    //create array with ascii codes of each character
    // console.log("B1: Tạo mảng với mã ASCII của mỗi kí tự.");
    const asciiText = text.split('').map((letter) => utils.charToASCII(letter));
    // console.log(asciiText);

    // create array of binary representations of ascii codes of each character
    // console.log("B2: Tạo mảng biểu diễn mã nhị phân của mã ASCII của mỗi kí tự.");
    let binaryText = asciiText.map((num) => utils.asciiToBinary(num));
    // console.log(binaryText);
    
    // padded with zeros at the front so they are 8 characters long as necessary
    // console.log("B3: Nối chuỗi '0' cho đến khi chúng có độ dài 8 bits.");
    let binary8bit = binaryText.map((num) => utils.padZero(num, 8));
    // console.log(binary8bit);

    // join the array into a singular string appended with a 1
    // console.log("B4: Nối mảng thành chuỗi và thêm '1' cuối chuỗi.");
    let numString = binary8bit.join('') + '1';
    // console.log(numString);

    //pad the array with zeros until it is modulo 512 === 448 <=> l = n*512 + 448 (n, l is integer) <=> l % 512 != 448
    // console.log("B5: Thêm '0' đến khi nó là modulo 512 === 448");
    while (numString.length % 512 !== 448) {
        numString += '0';
    };
    // console.log(numString);

    /**
     * append the length of the original 8 bit binary representation of the message to your string,
     * padded with zeros so it is 64 characters in length
     */
    //SHA-1 will not support strings above 2^64 - 1 bits, so the length will never be greater than or equal to 64
    // console.log("B6: nối độ dài của biến biểu diễn nhị phân 8 bit ban đầu vào chuỗi, độ dài được đệm bằng các số không để nó có độ dài 64bit.");
    const length = binary8bit.join('').length;
    const binaryLength = utils.asciiToBinary(length);
    const paddedBinLength = utils.padZero(binaryLength, 64);
    numString += paddedBinLength;
    // console.log(numString);

    //split that binary string into chunks of 512
    // console.log("B7: Chia chuỗi nhị phân đó thành các phần có 512 bit");
    const chunks = utils.stringSplit(numString, 512);
    // console.log(chunks);

    //split each of those chunks into 16 'words' (within subarrays) of 32 characters each
    // console.log("B8: Chia mỗi phần trong số các phần đó thành 16 'words' mỗi 'words' có 32 bit");
    const words = chunks.map((chunk) => utils.stringSplit(chunk, 32));
    // console.log(words);

    /**
     * this step will loop through each of those arrays 'chunks' of 16 words and
     * use XOR bitwise operations to extend those arrays into arrays of 80 32-character binary words each
     */
    /**
     * bước này sẽ lặp lại từng mảng trong 'chunks' gồm 16 word và
     * sử dụng các phép toán bitwise XOR để mở rộng các mảng đó thành các mảng gồm 80 từ 32 ký tự.
     */

    console.log("B9: lặp từng mảng trong 'chunks' gồm 16-word và dùng phép toán bitwise XOR để mở rộng các mảng đó thành các mảng gồm 80bit từ 32bit.");
    const words80 = words.map((array) => {
        /**
         * loop for each 16-word chunk that will extend it to be a 'chunk' array of 80 words,
         * using bitwise operations on each
         */
        for (let i = 16; i <= 79; i++) {
            //take four words from that chunk using your current i in the loop
            const wordA = array[i - 3];
            const wordB = array[i - 8];
            const wordC = array[i - 14];
            const wordD = array[i - 16];

            //perform consecutive bitwise operations going through each word
            const xorA = utils.xOR(wordA, wordB);
            const xorB = utils.xOR(xorA, wordC);
            const xorC = utils.xOR(xorB, wordD);

            //left rotate by one
            const leftRotated = utils.leftRotate(xorC, 1);
            //append to the array and continue the loop
            array.push(leftRotated);
        }
        return array;
    });

    // console.log(words80);

    //large loop where we use bitwise operations on our initial constants and word chunks and continually reassign them
    console.log("B10: ");
    for (let i = 0; i < words80.length; i++) {
        //initializing to the constants set at the beginning of the function
        let a = h0;
        let b = h1;
        let c = h2;
        let d = h3;
        let e = h4;

        //loop 80 times, and perform different bitwise operations and initialize a different k constant depending on where in the loop you are
        for (let j = 0; j < 80; j++) {
            let f, k;
            if (j < 20) { //0 <= t <= 19
                const BandC = utils.and(b, c);
                const notB = utils.and(utils.not(b), d);
                f = utils.or(BandC, notB);
                k = '01011010100000100111100110011001'; //5a827999
            } else if (j < 40) { //20 <= t <= 39
                const BxorC = utils.xOR(b, c);
                f = utils.xOR(BxorC, d);
                k = '01101110110110011110101110100001'; //6ed9eba1
            } else if (j < 60) { //40 <= t <= 59
                const BandC = utils.and(b, c);
                const BandD = utils.and(b, d);
                const CandD = utils.and(c, d);
                const BandCorBandD = utils.or(BandC, BandD);
                f = utils.or(BandCorBandD, CandD);
                k = '10001111000110111011110011011100'; //8f1bbcdc
            }
            else { //60 <= t <= 79
                const BxorC = utils.xOR(b, c);
                f = utils.xOR(BxorC, d);
                k = '11001010011000101100000111010110'; //ca62c1d6
            }
            
            /**
             * this occurs in every one of the loops, regardless what count j is at,
             * and is adding together then reassigning all of the constants,
             * which will then be used again in the next (of 80) iterations through the loop
             */
            const word = words80[i][j];
            const tempA = utils.binaryAddition(utils.leftRotate(a, 5), f);
            const tempB = utils.binaryAddition(tempA, e);
            const tempC = utils.binaryAddition(tempB, k);
            let temp = utils.binaryAddition(tempC, word);

            temp = utils.truncate(temp, 32);
            e = d;
            d = c;
            c = utils.leftRotate(b, 30);
            b = a;
            a = temp;
        }

        //after going through 80 times, add together your constants and truncate them to a length of 32
        h0 = utils.truncate(utils.binaryAddition(h0, a), 32);
        h1 = utils.truncate(utils.binaryAddition(h1, b), 32);
        h2 = utils.truncate(utils.binaryAddition(h2, c), 32);
        h3 = utils.truncate(utils.binaryAddition(h3, d), 32);
        h4 = utils.truncate(utils.binaryAddition(h4, e), 32);
    }
    //convert each variable into hexadecimal notation and then concatenate those and return your final hash value
    return [h0, h1, h2, h3, h4].map((string) => utils.binaryToHex(string)).join('');
};

module.exports = sha1;
