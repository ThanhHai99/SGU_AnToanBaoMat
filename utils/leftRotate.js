let leftRotate = (data, d) => {
    let temp = data.slice(0);
    for (let i = 0; i < d - 1; i++) {
        let first = temp.shift();
        temp.push(first);
    }
    return temp;
};

module.exports = leftRotate;
