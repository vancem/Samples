'use strict';
const { stringify } = require("querystring");

// debugger;
let start = Date.now();
function ts() {
    return (Date.now() - start).toString().padStart(5);
}

console.log(ts() + " Start");
let firstPromise = new Promise((resolve, reject) => {

    // We succeed in a a second;
    setTimeout(() => { 
        console.log(ts() + " firstPromise returning success!");
        resolve("Success!");
    }, 1000);
    // We fail in 1/2 second!
    
    /** 
    setTimeout(() => {
        console.log(ts() + " firstPromise FAILING");
        reject("BAD ERROR!!!")
    }, 500);
    **/

});
console.log(ts() + " firstPromise = ", firstPromise);

let secondPromise = firstPromise.then(firstPromiseValue => {
    console.log(ts() + " firstPromise.then handler firstPromiseValue: ", firstPromiseValue);
    //console.log(ts() + " firstPromise = ", firstPromise);

    // console.log(ts() + " Error firstPromise.then()");
    // throw "FIRST_THEN ERROR";
    // firstPromise.sdfaadsg(); 

    JSON.parse("}}}");
    console.log(ts() + " firstPromise.then returning 0");
    return 0;
});
console.log(ts() + " secondPromise = ", secondPromise);

let thirdPromise = secondPromise.then(secondPromiseValue => {
    console.log(ts() + " secondPromise.then handler secondPromiseValue: ", secondPromiseValue);
    //console.log(ts() + " secondPromise = ", secondPromise);
    console.log(ts() + " secondPromise.then returning 3");
    return 3;
});
console.log(ts() + " thirdPromise = ", thirdPromise);

let fourthPromise = thirdPromise.then(thirdPromiseValue => {
    console.log(ts() + " thirdPromiseValue.then handler thirdPromiseValue: ", thirdPromiseValue);
    //console.log(ts() + " thirdPromise = ", thirdPromise);
    console.log(ts() + " thirdPromise.then returning undefined");
    console.log(ts() + " PROGRAM TYPICALLY ENDS");
});

/**
console.log(ts() + " adding catch");
fourthPromise.catch(errorValue => {
    console.log(ts() + " In Catch of forthPromise errorValue = ", errorValue);
    console.log(ts() + " END OF CATCH");
});
**/



/* Node's file system functions predate promises and async functions, but you can
   make your own, which is what I do here */
function readFileAsync(name)
{
    return new Promise((resolve, reject) => {
        fs.readFile(name, (err, data) => {
            if (data !== undefined)
                resolve(data);
            else 
                reject(err)
        })
    }); 
}