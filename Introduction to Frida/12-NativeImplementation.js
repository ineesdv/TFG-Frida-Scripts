Java.perform(() => {

    var funcAddr = Module.findExportByName('library.so', 'function');
    const originalFunc = new NativeFunction(funcAddr, 'int', ['pointer', 'pointer']);

    Interceptor.replace(funcAddr, new NativeCallback (function (arg0, arg1) {
        
        // ...
        // Original function can be called: originalFunc(arg0, arg1)
        return 1;

    }, 'int', ['pointer', 'pointer']));

});