let leftRotate = (data, d) => {
    // let temp = data.slice(0);
    // for (let i = 0; i < d - 1; i++) {
    //     let first = temp.shift();
    //     temp.push(first);
    // }
    // return temp;;
    return data.substring(d, data.length) + data.substring(0, d);


};

// console.log(leftRotate("1234", 2));

module.exports = leftRotate;
