const utils  = require("./utils/index");

let sha1 = (text) => {
    // console.log("Plaintext: " + text);
    // console.log("Step 1: Take input text and split it into an array of the characters' ASCII codes");
    const asciiText = text.split('').map(letter => letter.charCodeAt(0));
    // console.log("Step 1 - result: ");
    // console.log(asciiText);

    // console.log("Step 2: Convert ASCII codes to binary");
    let asciiToBinary = asciiText.map(num => utils.asciiToBinary(num));
    // console.log("Step 2 - result: ");
    // console.log(asciiToBinary);

    // console.log("Step 3: Pad zeros to the front of each until they are 8 bits long");
    let binary8bit = [...asciiToBinary].map(num => num.padStart(8, '0'));
    // console.log("Step 3 - result: ");
    // console.log(binary8bit);
    
    // console.log("Step 4: Join and append a 1");
    let numString = binary8bit.join('') + '1';
    // console.log("Step 4 - result: ");
    // console.log(numString);

    // console.log("Step 5: Pad the binary message with zeros until its length is 512 mod 448");
    while(numString.length % 512 !== 448) {
        numString += '0';
    };
    // console.log("Step 5 - result: ");
    // console.log(numString);

    // console.log("Step 6: Take binary 8-bit ASCII code array from step 3, get its length in binary");
    const length = binary8bit.join("").length;
    const binaryLength = utils.asciiToBinary(length);
    // console.log("Step 6 - result: ");
    // console.log(`length = ${length}(${binaryLength})`);
    
    // console.log("Step 7: Pad with zeros until it is 64 characters");
    let paddedBinLength = binaryLength.padStart(64, '0');
    // console.log("Step 7 - result: ");
    // console.log(paddedBinLength);
    
    // console.log("Step 8: Append to your previously created binary message from step 5");
    numString += paddedBinLength;
    // console.log("Step 8 - result: ");
    // console.log(numString);
    // console.log(numString.length);
    
    // console.log("Step 9: Break the message into an array of 'chunk' of 512 characters");
    let chunks = utils.stringSplit(numString, 512);
    // console.log("Step 9 - result: ");
    // console.log(chunks);
    
    console.log("Step 10: Break each chunk into a subarray of sixteen 32-bit 'words'");
    let chunkWords = chunks.map(chunk => utils.stringSplit(chunk, 32))
    console.log("Step 10 - result: ");
    console.log(chunkWords);
    
    console.log("Step 11: Loop through each 'chunk' array of sixteen 32-bit 'words' and extend each array to 80 'words' using bitwise operations");
    //chunkWords is an array of 'chunk' subarrays
    var j = 0;
    const words80 = chunkWords.map(chunk => {        
        //we start with a 'chunk' array of 16 32-bit 'words'
        for (let i = 16; i <= 79; i++) {
            //take four words from that chunk using
            // your current i in the loop
            const wordA = chunk[i - 3];
            const wordB = chunk[i - 8];
            const wordC = chunk[i - 14];
            const wordD = chunk[i - 16];

            //perform consecutive XOR bitwise
            //operations going through each word
            const xorA = utils.xOR(wordA, wordB);
            const xorB = utils.xOR(xorA, wordC);
            const xorC = utils.xOR(xorB, wordD);

            //left rotate by one
            const newWord = utils.leftRotate(xorC, 1);
            //append to the array and continue the loop
            chunk.push(newWord);
            console.log(++j);
            console.log(newWord);
            console.log("=================================");
        };
        // return chunk;
    });

    console.log("Step 11 - result: ");
    console.log(words80);
    
    // console.log("Step 12: Initialize some variables");
    // console.log("Step 12 - result: ");
    
    // console.log("Step 13: Looping through each chunk: bitwise operations and variable reassignment");
    // console.log("Step 13 - result: ");
    
    // console.log("Step 14: Convert each of the five resulting variables to hexadecimal");
    // console.log("Step 14 - result: ");
    
    // console.log("Step 15: Join them together and return it!");
    // console.log("Step 15 - result: ");
};

(() => {
    sha1("A Test");
})();

