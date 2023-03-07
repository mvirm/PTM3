'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
class $Promise {
    constructor(executor) {
        if(typeof executor !== 'function') throw new TypeError('executor be must function');
    
        this._state = 'pending';
        this._value = undefined;
        this._handlerGroups = []; 

        const callHandlers = (value) => {
            while(this._handlerGroups.length) {
                const { successCb, errorCb, downstreamPromise } =this._handlerGroups.shift();
                //CASO FULFILLED
                if(this._state === 'fulfilled') {
                    //NO TENGO SUCCESS HANDLER
                    if(!successCb) downstreamPromise._internalResolve(value);
                    //SI TENGO SUCCESS HANDLER
                    else {
                        try {
                            const result = successCb(value);
                        //caso 1: RETORNA UNA NUEVA PROMESA
                            if(result instanceof $Promise) {
                                result.then(
                                    value => downstreamPromise._internalResolve(value),
                                    err => downstreamPromise._internalReject(err)
                                );
                            } else {
                        //caso 2: SI RETORNA UN VALOR
                                downstreamPromise._internalResolve(result);        
                            };
                        } catch (error) {
                        //caso 3: SI RETORNA UN ERROR    
                            downstreamPromise._internalReject(error);
                        }
                    }
                };
                //CASO REJECTED
                if(this._state === 'rejected') {
                    if(!errorCb) downstreamPromise._internalReject(value);
                    else {
                        try {
                            const result = errorCb(value);

                            if(result instanceof $Promise) {
                                result.then(
                                    value => downstreamPromise._internalResolve(value),
                                    err => downstreamPromise._internalReject(err)
                                );
                            } else downstreamPromise._internalResolve(result);
                        } catch (error) {
                            downstreamPromise._internalReject(error);
                        }
                    }
                }
            }
        }

        this._internalResolve = (data) => {
            if(this._state === 'pending') {
                this._state = 'fulfilled';
                this._value = data;
                callHandlers(this._value);
            };
        };
        this._internalReject = (reason) => {
            if(this._state === 'pending') {
                this._state = 'rejected';
                this._value = reason;
                callHandlers(this._value);
            }
        };

        const resolve = (data) => {
            this._internalResolve(data);
        };

        const reject = (reason) => {
            this._internalReject(reason);
        };
         executor(resolve, reject);

         this.then = (successHandler, errorHandler) => {
            const downstreamPromise = new $Promise(() => {}); //creo una nueva promesa
            const handlers = {
                successCb: typeof successHandler === 'function'? successHandler : false,
                errorCb: typeof errorHandler === 'function'? errorHandler : false,
                downstreamPromise,
            };
            this._handlerGroups.push(handlers);
            if(this._state !== 'pending') callHandlers(this._value);
            return downstreamPromise;
        };

         this.catch = (errorHandler) => {
            return this.then(null, errorHandler);
         };
    }

    static resolve(value) {
        if(value instanceof $Promise) return value;
        const newPromise = new $Promise(() => {});
        newPromise._internalResolve(value);
        return newPromise;
      };
    
}


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
