Java.perform(() => {

    // Call the nativeFunction
    var funcAddr = Module.findExportByName('library.so', 'function');
    var nativeFunction = new NativeFunction(funcAddr, 'void', ['pointer']);

    var env = Java.vm.getEnv()
    var arg1 = env.newStringUtf('Example')

    nativeFunction(env.handle, ptr(0x0000000), arg1)

});