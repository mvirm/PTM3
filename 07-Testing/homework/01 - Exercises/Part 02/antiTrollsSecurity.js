const antiTrollsSecurity = (string) => {
    return string.replace(/[aeiouAEIOU]/g, '')
};

module.exports = antiTrollsSecurity;
