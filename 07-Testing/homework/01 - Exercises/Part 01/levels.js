const levelOne = (a, b) => a + b;

const levelTwo = (letras) => {
    if(!letras.length){
        return "";
    } else if(letras.length <= 2) {
        return letras[0].toString();
    } else {
        let arr = [];
        for(let i = 0; i < letras.length; ++i) {
            if(i % 2 === 0) {
                arr.push(letras[i]);
            }
        };
        return arr.join("");
    }
};

const levelThree = (a, b) => {
    const newArray = a.concat(b);
    return newArray.sort((a, b) => a -b);
};

const levelFour = (num) => {
    const str = num.toString().split("")
    const integrer = str.map(s =>parseInt(s, 10))
    const suma = integrer.reduce((a, b) => a + b)
    const reverse = suma.toString().split("").reverse().join("")
    if((suma * reverse) === num) {
        return true;
    } else {
        return false;
    }
};


module.exports = { levelOne, levelTwo, levelThree, levelFour };
