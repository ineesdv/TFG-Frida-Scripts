function stackTrace() {
    var ThreadDef = Java.use('java.lang.Thread');
    var ThreadObj = ThreadDef.$new();
    console.log(`[+] Printing stack trace...`);
    console.log("---------------------------------------------------------");
    var stack = ThreadObj.currentThread().getStackTrace();
    for (var i = 0; i < stack.length; i++) {
        console.log(`${i}\t| ${stack[i].toString()}`);
    }
    console.log("---------------------------------------------------------");
}

function nativeLibs(){
    var System = Java.use('java.lang.System');
    var Runtime = Java.use('java.lang.Runtime');
        
    System.load.overload('java.lang.String').implementation = function(library) {
        console.log(`[NATIVE] Native library loaded: ${library}\n`);
        //stackTrace();
        this.load(library);
        return;
    }

    System.loadLibrary.overload('java.lang.String').implementation = function(library) {
        console.log(`[NATIVE] Native library loaded: ${library}\n`);
        //stackTrace();
        this.loadLibrary(library);
        return;
    }

    Runtime.load.overload('java.lang.String').implementation = function(library) {
        console.log(`[NATIVE] Native library loaded: ${library}\n`);
        //stackTrace();
        this.load(library);
        return;
    }

    Runtime.loadLibrary.overload('java.lang.String').implementation = function(library) {
        console.log(`[NATIVE] Native library loaded: ${library}\n`);
        //stackTrace();
        this.loadLibrary(library);
        return;
    }
}

Java.perform(function() {
    console.log('');
    console.log('[*] Hooking native libraries ...');
    console.log('');
    nativeLibs();
});