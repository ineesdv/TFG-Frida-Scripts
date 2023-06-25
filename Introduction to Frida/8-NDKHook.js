Java.perform(() => {
    // ...

    var funcAddress = Module.getExportByName('library.so','function');

    Interceptor.attach(funcAddress, {
        onEnter: function(args) { 
            console.log('[+] Inside function');
            var string = Java.vm.getEnv().getStringUtfChars(args[2]).readUtf8String();
            console.log('Introduced: ${string}');
        },

        onLeave: function(retval) {
            var string = Java.vm.getEnv().getStringUtfChars(retval).readUtf8String();
            console.log('Returned: ${string}');
        }
    })

    // ...
});