const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");


function pwd(print) {
    return print(process.cwd());
}

function date(print) {
    return print(Date());
}

function echo(print, args) {
    return print(args);
}

function ls(print) {
    fs.readdir('.', (error, files) => {
        if(error) throw new Error(error);
        print(files.join(' '));
    });
}

function cat(print, args) {
   fs.readFile(args, 'utf-8', (error, data) => {
    if(error) throw new Error(error);
    print(data.split('\n').join('\n'));
   })
}

function head(print, args) {
    fs.readFile(args, 'utf-8', (error, data) => {
        if(error) throw new Error(error);
        print(data.split('\n')[0].trim());
    });
}

function tail(print, args) {
    fs.readFile(args, 'utf-8', (error, data) => {
        if(error) throw new Error(error);
        print(data.split('\n').pop().trim());
    })
}

function curl(print, args) {
    utils.request(args, (error, response) => {
        //con throw error no pasa el test
        error ? console.log(error) : print(response);
    })
}

module.exports = {
    pwd,
    date,
    echo,
    ls,
    cat,
    head,
    tail,
    curl,
};
