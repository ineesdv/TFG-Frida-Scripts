Java.perform(() => {

    var funcAddr = Module.getBaseAddress('library.so').add('0x8d6c');
    Interceptor.attach(funcAddr, {

        onEnter: function(args) {
            console.log(`Argument 1: ${Memory.readCString(args[0])}`);
            console.log(`Argument 2: ${Memory.readCString(args[1])}`);
        },
        onLeave: function(ret) {
            console.log(`Returned value: ${ret.toInt32()}`);
        }
    })

});