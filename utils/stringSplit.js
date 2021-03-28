let stringSplit = (numString, length) => {
    console.log(length);
    const regex = new RegExp("(.{" + length + "})", "gi");
    return numString.split(regex).filter(i => i);
};

module.exports = stringSplit;
