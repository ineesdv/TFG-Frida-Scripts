Java.perform(function() {
    const SystemClass = Java.use('java.lang.System');
    const RuntimeClass = Java.use('java.lang.Runtime');
    const VMStackClass = Java.use('dalvik.system.VMStack');
  
    var libraryName = 'library.so';
  
    SystemClass.loadLibrary.overload('java.lang.String').implementation = function(library) {
        console.log(`[+] Loading library ${library}`);
        try {
            const loadedLibrary = RuntimeClass.getRuntime().loadLibrary0(VMStackClass.getCallingClassLoader(), library);
            if(library.includes(libraryName)) {
                console.log(`[>] Succesfully hooked library ${library}`);
                // Add instrumentation code
            }
            return loadedLibrary;

        } catch(e) {
            console.log(e);
        }
    };
});