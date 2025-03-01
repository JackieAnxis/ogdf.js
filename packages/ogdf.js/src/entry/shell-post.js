

        // The shell-pre.js and emcc-generated code goes above
        return Module;
    }); // The end of the promise being returned

  return initOGDFPromise;
} // The end of our initOGDF function

// // This bit below is copied almost exactly from what you get when you use the MODULARIZE=1 flag with emcc
// // However, we don't want to use the emcc modularization. See shell-pre.js
if (typeof exports === 'object' && typeof module === 'object'){
    module.exports = initOGDF;
    // This will allow the module to be used in ES6 or CommonJS
    module.exports.default = initOGDF;
}
else if (typeof define === 'function' && define['amd']) {
    define([], function() { return initOGDF; });
}
else if (typeof exports === 'object'){
    exports["Module"] = initOGDF;
}
    
