let xOR = (a, b) => {
    let t = a ^ b;
    return t.toString().padStart(32, '0');
};

module.exports = xOR;
