Java.perform(function() {
    //nativeFunctions();
    //modules();
    //openedLibs();
    //logKeys();
    //trace();
    //listExportedFuncs();
    onlibraryload();

});

function nativeFunctions(){
    let MainActivity = Java.use('com.CTF.ctf3.MainActivity');
   
    MainActivity.decryptString.implementation = function (str, str2) {
        console.log(`[+] Native decryptString called`);
        console.log(`\t[-] Arg1: ${str}`);
        console.log(`\t[-] Arg2: ${str2}`);
        let result = this.decryptString(str, str2);
        console.log(`\t[>] Result: ${result}\n`);
        return result;
    };

    MainActivity.encryptString.implementation = function (str, str2) {
        console.log(`[+] Native encryptString called`);
        console.log(`\t[-] Arg1: ${str}`);
        console.log(`\t[-] Arg2: ${str2}`);
        let result = this.encryptString(str, str2);
        console.log(`\t[>] Result: ${result}\n`);
        return result;
    };

}

function modules() {
    var modules = Process.enumerateModules();
    console.log('[+] Enumerating modules...')
    for (var i = 0; i < modules.length; i++) {
        console.log(`\t[-] ${modules[i].name}`)
    }
    console.log(``);
}

function openedLibs() {
    Interceptor.attach(Module.findExportByName(null, 'dlsym'), {
        onEnter: function(args) {
            var str = args[1].readUtf8String();
            if ( str.includes('CTF_ctf3') ) {
                var module = Process.findModuleByName('libnative-lib.so')
                //console.log(str)
                if (module != null) {
                    let obj = JSON.parse(JSON.stringify(module));
                    console.log(`\t[+] Module found: ${obj.name}`);
                    console.log(`\t[-] Base: ${obj.base}`);
                    console.log(`\t[-] Size: ${obj.size}`);
                    console.log(`\t[-] Path: ${obj.path}`);
                    console.log('');
                }
            }
        }
    });
}

function logKeys() {
    var libraryPath = '/data/app/~~PiZgdhAhN2_nNC7NyxxEVA==/com.CTF.ctf3-7RLVyQHOWRIHHYx3UBgmLQ==/base.apk!/lib/x86_64/libnative-lib.so'
    var lib = Module.load(libraryPath)
    
    var exorFunctionAddress = lib.base.add(0x15b80)
    var exorFunction = new NativeFunction(exorFunctionAddress, 'pointer', ['pointer', 'pointer'])

    Interceptor.attach(exorFunctionAddress, {
        onEnter: function(args) {
        },
        onLeave: function(retval) {
            console.log(`\[-] Key: ${retval.readUtf8String()}`)
        }
    });

    var index = 0
    Interceptor.attach(Module.findExportByName(null, 'rand'), {
        onLeave: function(retval) {
            retval.replace(index)
        }
    });

    var init = Memory.alloc(24).writeUtf8String('0123456789ABCDEF')
    var key = Memory.alloc(24)

    for (index = 0; index < 9000; index++) {
        exorFunction(init, key)
    }
}


function getNativeStackTrace(context) {
    console.log(`[+] Printing stack trace...`);
    console.log('-------------------------------------------');
    var backtrace = Thread.backtrace(context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress);
    for (var i = 0; i < backtrace.length; i++) {
      console.log(`${i}\t| ${backtrace[i].toString()}`);
    }
    console.log('-------------------------------------------');

}

function trace(){
    const System = Java.use('java.lang.System');
    const Runtime = Java.use('java.lang.Runtime');
    const SystemLoad = System.loadLibrary.overload('java.lang.String');
    const VMStack = Java.use('dalvik.system.VMStack');
    console.log('');

    SystemLoad.implementation = function(library) {
        console.log('[*] Loading library: ' + library +'...')
        try {
            const loaded = Runtime.getRuntime().loadLibrary0(VMStack.getCallingClassLoader(), library)
            console.log('[*] Library loaded!')

            var mod_name = 'libnative-lib.so'
            var index = 0

            Interceptor.attach(Module.findExportByName('libnative-lib.so', 'Checker'), {
                onEnter(args) {
                },
                onLeave(retval) {
                    retval.replace(0x1);
                }
            });  

            var index = 0;

            Interceptor.attach(Module.findExportByName(null, 'rand'), {
                onLeave: function(retval) {
                    retval.replace(index)
                }
            });

            Interceptor.attach(Module.findExportByName('libnative-lib.so', 'Java_com_CTF_ctf3_MainActivity_decryptString'), {
                onEnter(args) {
                    console.log('[+] Tracing all jumps instructions inside Java_com_CTF_ctf3_MainActivity_decryptString...');

                    Stalker.follow(this.threadId, {
                        events: {
                            call: true, 
                            ret: false, 
                            exec: false,
                            block: false
                        },
                        transform(iterator) {
                            let instruction = iterator.next();
                            do {
                                if (instruction.mnemonic.startsWith('j')){
                                var targetAddress;

                                    if (instruction.operands[0].type == 'mem') { // Indirect jumps
                                        targetAddress = instruction.address.add(ptr(instruction.operands[0].value.disp));
                                        var symbol = DebugSymbol.fromAddress(ptr(targetAddress));

                                        if (symbol.name !== null) {
                                            console.log(`\t${instruction.mnemonic} ${symbol.name}`);
                                        } else {
                                            console.log(`\t${instruction}`);
                                        }

                                    } else if (instruction.operands[0].type == 'reg') { // Register-based target
                                        console.log(`\t${instruction}`);
                                        
                                    // Direct jump    
                                    } else { 
                                        targetAddress = instruction.operands[0].value;
                                        var symbol = DebugSymbol.fromAddress(ptr(targetAddress));

                                        if (symbol.name !== null) {
                                            console.log(`\t${instruction.mnemonic} ${symbol.name}`);
                                        } else {
                                            console.log(`\t${instruction}`);
                                        }
                                    }
                                }
                                
                                iterator.keep();
                            } while ((instruction = iterator.next()) != null);
                        }
                        
                    });
                },
                onLeave: function(retval) {
                    var env = Java.vm.getEnv()
                    var str = env.getStringUtfChars(retval).readUtf8String()
                    console.log('')
                    console.log(`[+] Returned value: ${str}`)
                    Stalker.unfollow(this.tid);
                                    
                }
            });

            var decodeAES_addr = Module.findExportByName('libnative-lib.so', 'Java_com_CTF_ctf3_MainActivity_decryptString')
            var decodeAES = new NativeFunction(decodeAES_addr, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer'])
            var env = Java.vm.getEnv()

            var ct_hex = env.newStringUtf('7843e53da44d5fa48584aad41480e0a2f8bd4a6508fe35837e225e9042160bdd1a97015a4c45dad857f5acc41f6e01ea')
            var password = env.newStringUtf('S@nf00RGhodhB33N')

            // for 1 -> 9005. Flag index: 1256
            for (index = 1256; index < 1257; index++) {
                try {
                    decodeAES(env.handle, ptr(0x7ffedbf76a68), ct_hex, password)
                }
                catch (e) {

                }
            }        

        }catch{

        }
    }

}

function listExportedFuncs(){

    const SystemClass = Java.use('java.lang.System');
    const RuntimeClass = Java.use('java.lang.Runtime');
    const VMStackClass = Java.use('dalvik.system.VMStack');

    SystemClass.loadLibrary.overload('java.lang.String').implementation = function(library) {
        console.log(`[+] Loading library ${library}`);
        try {
            const loadedLibrary = RuntimeClass.getRuntime().loadLibrary0(VMStackClass.getCallingClassLoader(), library);
            console.log(`[>] Succesfully hooked library ${library}`);
            
            console.log('[+] Enumerating exported functions...');
            var exportedFunctions = Module.enumerateExports('libnative-lib.so')

            exportedFunctions.forEach(function(element, index){
                if (element.name.includes('Checker')){
                    console.log(`\t[>] Function: ${element.name} @ ${element.address}`);
                } else if (element.name.includes('decrypt')){
                    console.log(`\t[>] Function: ${element.name} @ ${element.address}`);
                } else {
                    console.log(`\t[-] Function: ${element.name} @ ${element.address}`);
                }
            });
            console.log('');

            return loadedLibrary;
        } catch(e) {
        console.log(e);
        }
    };
}

function onlibraryload(){
    const SystemClass = Java.use('java.lang.System');
    const RuntimeClass = Java.use('java.lang.Runtime');
    const VMStackClass = Java.use('dalvik.system.VMStack');

    SystemClass.loadLibrary.overload('java.lang.String').implementation = function(library) {
        console.log(`[+] Loading library ${library}`);
        try {
            const loadedLibrary = RuntimeClass.getRuntime().loadLibrary0(VMStackClass.getCallingClassLoader(), library);
            console.log(`[>] Succesfully hooked library ${library}`);
            
            // HOOKS
            // hookEncryptString();
            // hookEncodeAES();
            hookActualEncrypt();

            return loadedLibrary;
        } catch(e) {
        console.log(e);
        }
    };
}

function hookEncryptString() {
    Interceptor.attach(Module.findExportByName('libnative-lib.so', 'Java_com_CTF_ctf3_MainActivity_encryptString'), {
        onEnter: function(args) {
            console.log(`[+] Inside of native encryptString`)
            var env = Java.vm.getEnv()
            console.log(`\t[-] ${env.getStringUtfChars(args[2]).readUtf8String()}`);
            console.log(`\t[-] ${env.getStringUtfChars(args[3]).readUtf8String()}`);
           
        }
    });
}
  

function hookEncodeAES() {
    Interceptor.attach(Module.findExportByName('libnative-lib.so', '_Z9EncodeAESPKhNSt6__ndk112basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEES0_PKc'), {
        onEnter: function(args) {
            console.log(`[+] Inside EncodeAES function`);
            console.log(`\t[-] Arg1: ${args[1].readUtf8String()}`);
            console.log(`\t[-] Arg2: ${args[2].readUtf8String()}`);
            console.log(`\t[-] IV: ${args[3].readUtf8String()}`);
            console.log(`\t[-] Password: ${args[4].readUtf8String()}`);
        },
        onLeave: function(retval) {
            console.log(`\t[>] Result: ${Memory.readCString(retval)}\n`);
        }
    });
}

function hookDecryptString() {
    Interceptor.attach(Module.findExportByName('libnative-lib.so', 'Java_com_CTF_ctf3_MainActivity_decryptString'), {
        onEnter: function(args) {
            console.log(`[+] Inside decryptString function`);
            var env = Java.vm.getEnv()
            
            console.log(`\t[-] Arg0: ${args[0]}`);
            console.log(`\t[-] Arg1: ${args[1]}`);
            console.log(`\t[-] Arg2: ${env.getStringUtfChars(args[2]).readUtf8String()}`);
            console.log(`\t[-] Arg3: ${env.getStringUtfChars(args[3]).readUtf8String()}`);
            
        },
        onLeave: function(retval) {

            console.log(`\t[>] Result: ${Java.vm.getEnv().getStringUtfChars(retval).readUtf8String()}\n`);
        }
    });
}

function hookSetDecryptKey() {
    Interceptor.attach(Module.findExportByName(null, 'AES_set_decrypt_key'), {
        onEnter: function(args) {
            console.log(`[+] Inside AES_set_decrypt_key function`);         
            
            console.log(`\t[-] Arg0: ${args[0].readUtf8String()}`);
            console.log(`\t[-] Arg1: ${args[1].readUtf8String()}`);
            console.log(`\t[-] IV: ${args[3].readUtf8String()}`);
            console.log(`\t[-] Password: ${args[4].readUtf8String()}`);
            console.log('iv: ' + args[3].readUtf8String()) 
            console.log('password: ' + args[4].readUtf8String())
        },
        onLeave: function(retval) {

            console.log(`\t[>] Result: ${Memory.readCString(retval)}\n`);
        }
    });
}
