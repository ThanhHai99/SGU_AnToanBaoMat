let stringSplit = (numString, length) => {
    const regex = new RegExp("(.{" + length + "})", "gi");
    return numString.split(regex).filter(i => i);
};

module.exports = stringSplit;
