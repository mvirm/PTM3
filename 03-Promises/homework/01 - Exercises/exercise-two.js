"use strict";

let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemAx: problemA,
  problemBx: problemB
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports["problem" + arg];
  if (problem) problem();
});

function problemA() {
  // callback version
  exerciseUtils.readFile("poem-two/stanza-01.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });
  exerciseUtils.readFile("poem-two/stanza-02.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });

  // promise version
  // Tu código acá:

  /*CON PROMISE ALL Y ARRAY CREADO POR AFUERA (NO PASA EL TEST)
  let promesas = [exerciseUtils.promisifiedReadFile('poem-two/stanza-01.txt'), exerciseUtils.promisifiedReadFile('poem-two/stanza-02.txt')];
  Promise.all(promesas)
  .then(stanzas => stanzas.forEach(stanza => exerciseUtils.blue(stanza)))
  .finally(console.log('done))*/
 

  /* CON PROMISE ALL Y ARRAY PASADO COMO ARGUMENTO (NO PASA EL TEST)
  Promise.all([exerciseUtils.promisifiedReadFile('poem-two/stanza-01.txt'), exerciseUtils.promisifiedReadFile('poem-two/stanza-02.txt')]).
  then(stanzas => {stanzas.forEach(stanza => exerciseUtils.blue(stanza));});*/

  /*SIN USAR PROMISE ALL
  exerciseUtils.promisifiedReadFile("poem-two/stanza-01.txt")
    .then(stanza01 => exerciseUtils.blue(stanza01))
  exerciseUtils.promisifiedReadFile("poem-two/stanza-02.txt")
    .then(stanza02 => exerciseUtils.blue(stanza02))*/

  //PASADO POR EMA
  const promesas = [
     exerciseUtils.promisifiedReadFile("poem-two/stanza-01.txt")
    .then(response => exerciseUtils.blue(response)),
     exerciseUtils.promisifiedReadFile("poem-two/stanza-02.txt")
    .then(response => exerciseUtils.blue(response))
  ]
  Promise.all(promesas)
    .then(success => {
      console.log(success);
      console.log('done')
    })
  }

function problemB() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });
  let randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

  // callback version
  filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
      if (err) exerciseUtils.magenta(new Error(err));
    });
  });

  // promise version
  // Tu código acá:
 /*CON PROMISE ALL MI VERSION (NO PASA EL TEST)
  let promesas = filenames.map(file => exerciseUtils.promisifiedReadFile(file));
    Promise.all(promesas)
    .then(stanzas => stanzas.forEach(stanza => exerciseUtils.blue(stanza)))
    .catch(err => exerciseUtils.magenta(new Error(err)))
    .finally(console.log('done'))*/
  
  //VERSION EMA
  let promesas = filenames.map(file => exerciseUtils.promisifiedReadFile(file).then(response => exerciseUtils.blue(response)));
 
    Promise.all(promesas)
    .then(success => console.log(success))
    .catch(err => exerciseUtils.magenta(new Error(err)))
    .finally(console.log('done'))
}





function problemC() {
  let fs = require("fs");
  function promisifiedWriteFile(filename, str) {
    // tu código acá:
  }
}
