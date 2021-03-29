let words80 = (data) => {
    //chunkWords is an array of 'chunk' subarrays
    data = chunkWords.map(chunk => {        
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
            // console.log(newWord);
            // console.log("=================================");
        };
        return chunkWords;
    });
};

module.exports = words80;
