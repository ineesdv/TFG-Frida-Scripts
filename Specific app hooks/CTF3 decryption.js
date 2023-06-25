Java.perform(function() {
    const System = Java.use('java.lang.System');
    const Runtime = Java.use('java.lang.Runtime');
    const VMStack = Java.use('dalvik.system.VMStack');
    var env = Java.vm.getEnv();
    console.log('');

    System.loadLibrary.overload('java.lang.String').implementation = function(library) {

        console.log(`[*] Loading library: '${library}'...`);

        const loaded = Runtime.getRuntime().loadLibrary0(VMStack.getCallingClassLoader(), library);
        console.log(`[+] Succesfully loaded the native library`);

        // Bypass checker function
        Interceptor.attach(Module.findExportByName("libnative-lib.so", "Checker"), {
            onLeave(retval) {
                retval.replace(0x1);
            }
        });   

        // Bruteforce to find the decryption key
        // Interceptor.attach(Module.findExportByName(null, "rand"), {
        //     onLeave: function(retval) {
        //         retval.replace(index)
        //     }
        // });

        // Set decryption key
         Interceptor.attach(Module.findExportByName(null, "rand"), {
            onLeave: function(retval) {
                retval.replace(1256);
            }
        });      

        // Log decrypted text
        Interceptor.attach(Module.findExportByName("libnative-lib.so", "Java_com_CTF_ctf3_MainActivity_decryptString"), {
            onLeave: function(retval) {
                let decryptedText = env.getStringUtfChars(retval).readUtf8String();
                console.log(`\t[-] Decrypted text: ${decryptedText}`);                      
            }
        });

        // Force call to native function "decryptString" to decrypt text
        console.log(`[+] Calling decryptString...`);
        var decryptString_addr = Module.findExportByName("libnative-lib.so", "Java_com_CTF_ctf3_MainActivity_decryptString");
        var decryptString = new NativeFunction(decryptString_addr, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer']);
        var encrypted_hex = env.newStringUtf("7843e53da44d5fa48584aad41480e0a2f8bd4a6508fe35837e225e9042160bdd1a97015a4c45dad857f5acc41f6e01ea");
        var password = env.newStringUtf("S@nf00RGhodhB33N");

        // Bruteforce to find the decryption key
        // for (index = 1; index < 9001; index++) {
        //     try {
        //         decryptString(env.handle, ptr(0x0000000), ct_hex, password)
        //     }
        //     catch (e) {
    
        //     }
        // }

        decryptString(env.handle, ptr(0x7ffedbf76a68), encrypted_hex, password);

        // Return loaded library
        return loaded;
    }
});