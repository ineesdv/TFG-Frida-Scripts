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

function DCL(){
    // Loaded file: /data/user/0/com.top.omit/app_DynamicOptDex/dmW.json
    let dexclassLoader = Java.use('dalvik.system.DexClassLoader');
    dexclassLoader.$init.implementation = function(dexPath, optimizedDirectory, libsPath, parentCL){
        console.log(`[+] DexClassLoader.$init`);
        console.log(`\t[-] File: ${dexPath}\n`);
        stackTrace();
        return this.$init(dexPath, optimizedDirectory, libsPath, parentCL);
    }
}

function classAttributes(){
    let entryPointApp = Java.use('com.top.omit.NOzGxLnHeDsTbTcKkMsSuXcQbTeKmPoBwFsZoYnSnPfKj');
    entryPointApp.onCreate.implementation = function () {
        console.log(`[+] Resolving attributes of class 'com.top.omit.NOzGxLnHeDsTbTcKkMsSuXcQbTeKmPoBwFsZoYnSnPfKj'`);

        console.log(`\t[-] Value of XhXwRYjr_613898: ${this.XhXwRYjr_613898.value}`);
        console.log(`\t[-] Value of PRgAyPzLhLaPaPwLjXhGlPgHfKeOlLsWaOiZaFj: ${this.PRgAyPzLhLaPaPwLjXhGlPgHfKeOlLsWaOiZaFj.value}`);
        console.log(`\t[-] Value of SswEzoQE_710064: ${this.SswEzoQE_710064.value}`);
        console.log(`\t[-] Value of ULrUlPgJxTnDy: ${this.ULrUlPgJxTnDy.value}`);
        console.log(`\t[-] Value of XSlHtSfHmXkSxAoErNtPhPtPl: ${this.XSlHtSfHmXkSxAoErNtPhPtPl.value}`);
        console.log(`\t[-] Value of FkNpYOiu_675211: ${this.FkNpYOiu_675211.value}`);
        console.log(`\t[-] Value of XTmstwRh_824280: ${this.XTmstwRh_824280.value}\n`);
        
        let NChZpOtInstance = this.SKrMmFhEcCjWzKzDlFcTzLoXjAoBu.value;
        let StringBuilder = Java.use('java.lang.StringBuilder');

        console.log(`\t[>] Deobfuscating some strings through SKrMmFhEcCjWzKzDlFcTzLoXjAoBu...`);
        console.log(`\t   [-] bouncedemise(): ${NChZpOtInstance.bouncedemise()}`);
        console.log(`\t   [-] buddybox(): ${NChZpOtInstance.buddybox(StringBuilder.$new())}`);
        console.log(`\t   [-] cliffduring(): ${NChZpOtInstance.cliffduring(StringBuilder.$new())}`);
        console.log(`\t   [-] crowdrapid(): ${NChZpOtInstance.crowdrapid()}`);
        console.log(`\t   [-] devotesecond(): ${NChZpOtInstance.devotesecond(StringBuilder.$new())}`);
        console.log(`\t   [-] dismisscement(): ${NChZpOtInstance.dismisscement()}`);
        console.log(`\t   [-] driparmed(): ${NChZpOtInstance.driparmed(StringBuilder.$new())}`);
        console.log(`\t   [-] elephantcasual(): ${NChZpOtInstance.elephantcasual()}`);
        console.log(`\t   [-] festivalcrowd(): ${NChZpOtInstance.festivalcrowd(StringBuilder.$new())}`);
        console.log(`\t   [-] flocksqueeze(): ${NChZpOtInstance.flocksqueeze(StringBuilder.$new())}`);
        console.log(`\t   [-] gossiphill(): ${NChZpOtInstance.gossiphill(StringBuilder.$new())}`);
        console.log(`\t   [-] hospitalvacuum(): ${NChZpOtInstance.hospitalvacuum()}`);
        
        console.log(``);
    }
}

function debugFiles(){

    let OFzEwHcShSgKbUw = Java.use("com.top.omit.OFzEwHcShSgKbUw");

    OFzEwHcShSgKbUw.embodychief.implementation = function (constructor, str) {
        console.log(`[+] OFzEwHcShSgKbUw.embodychief is called`);
        console.log(`\t[>] Malicious file created: ${str}`);
        console.log(``);
        let result = this.embodychief(constructor, str);
        return result;
    };

    OFzEwHcShSgKbUw.driftcan.implementation = function (str, context, str2) {
        console.log(`[+] OFzEwHcShSgKbUw.driftcan is called`);
        console.log(`\t[-] Str: ${str}`);
        console.log(`\t[-] Str2: ${str2}\n`);
        let result = this.driftcan(str, context, str2);
        console.log(`\t[-] Result: ${result}\n`);
        return result;
    };

    OFzEwHcShSgKbUw.boxreduce.implementation = function (str, context, str2) {
        console.log(`[+] OFzEwHcShSgKbUw.boxreduce is called`);
        console.log(`\t[-] Str: ${str}`);
        console.log(`\t[-] Str2: ${str2}\n`);
        let result = this.boxreduce(str, context, str2);
        console.log(`\t[-] Result: ${result}\n`);
        return result;
    };

    let entryPointApp = Java.use("com.top.omit.NOzGxLnHeDsTbTcKkMsSuXcQbTeKmPoBwFsZoYnSnPfKj");
    entryPointApp.hawksketch.implementation = function (str) {

        console.log(`[+] entryPointApp.hawksketch is called`);
        console.log(`\t[-] Str: ${str}`);

        let contextInstance = this.KWdCiFaNcPbMyDiAsWzIlNwXiPiNrQaZpCsRcQtFmBl.value;
        console.log(`\t[-] Intercepted KWdCiFaNcPbMyDiAsWzIlNwXiPiNrQaZpCsRcQtFmBl instance`);
        console.log('\t[-] Class name:', contextInstance.class.getName());
        let result = this.hawksketch(str);
        console.log(`\t[-] entryPointApp.hawksketch result=${result}`);
        return result;
    };

    OFzEwHcShSgKbUw.venuesiege.implementation = function (file) {
        console.log(`[+] OFzEwHcShSgKbUw.venuesiege is called`);
        console.log(`\t[-] File: ${file.getAbsolutePath()}`);
        var result = this.venuesiege(file);
        console.log(`\t[-] File length: ${result}\n`);
        return result;
    };
  
    
    OFzEwHcShSgKbUw.warmbamboo.implementation = function (file, byteArray) {
        console.log(`[+] OFzEwHcShSgKbUw.warmbamboo is called with a file and a byteArray`);
        console.log(`\t[-] File: ${file.getAbsolutePath()}`);
        var result = this.warmbamboo(file, byteArray);
        console.log(`\t[-] Result: ${result}\n`);
        return result;
    };
  
   
    OFzEwHcShSgKbUw.benefitcrouch.implementation = function (arg1, arg2) {
        console.log(`[+] OFzEwHcShSgKbUw.benefitcrouch is called`);
        //console.log(`\t[-] Arg1: ${arg1}`); // Byte array
        console.log(`\t[-] Arg2: ${arg2}\n`); // /data/user/0/com.top.omit/app_DynamicOptDex/dmW.json
        var result = this.benefitcrouch(arg1, arg2);
        console.log(`\t[-] Result: ${result}\n`);
        return result;
    };
  
    
    OFzEwHcShSgKbUw.lightphone.implementation = function (file) {
        console.log(`[+] OFzEwHcShSgKbUw.lightphone is called`);
        console.log(`\t[-] File: ${file.getAbsolutePath()}`);
        var result = this.lightphone(file);
        console.log(`\t[-] Result: ${result}\n`);
        return result;
    };
    
            
}

function debugUnpacking(){

    let NChZpOtXfKyLrRhPnKzOeLaJoUoQcTjEkNoPkCzIlPyEy = Java.use('com.top.omit.NChZpOtXfKyLrRhPnKzOeLaJoUoQcTjEkNoPkCzIlPyEy');
    NChZpOtXfKyLrRhPnKzOeLaJoUoQcTjEkNoPkCzIlPyEy.burstcement.implementation = function (field, str, str2, str3, weakReference) {
        console.log(`[+] NChZpOtXfKyLrRhPnKzOeLaJoUoQcTjEkNoPkCzIlPyEy.burstcement is called`);
        console.log(`\t[-] Field: ${field}`);
        console.log(`\t[-] Str: ${str}`);
        console.log(`\t[-] Str2: ${str2}`); // Payload file: /data/user/0/com.top.omit/app_DynamicOptDex/dmW.json
        console.log(`\t[-] Str3: ${str3}`);
        console.log(`\t[-] weakReference: ${weakReference}`);
        console.log(``);
        this.burstcement(field, str, str2, str3, weakReference);
    };



     let entryPointApp = Java.use('com.top.omit.NOzGxLnHeDsTbTcKkMsSuXcQbTeKmPoBwFsZoYnSnPfKj');
    entryPointApp.enacthead.implementation = function (str) {
        console.log(`[+] entryPointApp.enacthead is called`);
        console.log(`\t[-] Str: ${str}\n`);
        let result = this.enacthead(str);
        console.log(`\t[-] Result: ${result}`);
        console.log(``);
        return result;
    };

    entryPointApp.conductpyramid.implementation = function (str) {
        console.log(`[+] entryPointApp.conductpyramid is called`);
        console.log(`\t[-] Str: ${str}\n`);
        let result = this.conductpyramid(str);
        console.log(`\t[-] Result: ${result}`);
        console.log(``);
        return result;
    };

    entryPointApp.hawksketch.implementation = function (str) {
        console.log(`[+] entryPointApp.hawksketch is called\n`);
        console.log(`\t[-] Str: ${str}\n`);

        let result = this.hawksketch(str);
        console.log(`\t[-] Result: ${result}`);
        console.log(``);
        return result;
    };

    let OFzEwHcShSgKbUw = Java.use('com.top.omit.OFzEwHcShSgKbUw');
    OFzEwHcShSgKbUw.driftcan.implementation = function (str, context, str2) {
        console.log(`[+] OFzEwHcShSgKbUw.driftcan is called`);
        console.log(`\t[-] Str: ${str}`);
        console.log(`\t[-] Str2: ${str2}\n`);
        let result = this.driftcan(str, context, str2);
        console.log(`\t[-] Result: ${result}`);
        console.log(``);
        return result;
    };

    OFzEwHcShSgKbUw.thatclaw.implementation = function (bufferedInputStream, bArr) {
        console.log(`[+] OFzEwHcShSgKbUw.thatclaw is called with a byteArray`);
        let result = this.thatclaw(bufferedInputStream, bArr);
        console.log(`\t[-] Result: ${result}`);
        console.log(``);
        return result;
    };
}

function dumpClasses() {
    var DexClassLoader = Java.use("dalvik.system.DexClassLoader");
    
    DexClassLoader.$init.overload('java.lang.String', 'java.lang.String', 'java.lang.String', 'java.lang.ClassLoader').implementation = function(dexPath, optimizedDirectory, librarySearchPath, parent) {
        console.log(`[+] DexClassLoader$init called`);

        console.log(`\t[>] Dexpath: ${dexPath}`);

        const File = Java.use('java.io.File');
        const FileInputStream = Java.use('java.io.FileInputStream');
        const FileOutputStream = Java.use('java.io.FileOutputStream');
        var sourceFile = File.$new(dexPath);

        try{
            if (sourceFile.exists() && sourceFile.canRead()) {
                var destinationFile = File.$new('/data/user/0/com.top.omit/payloadDump.dex');
                destinationFile.createNewFile();
                var fileInputStream = FileInputStream.$new.overload('java.io.File').call(FileInputStream, sourceFile);
                var fileOutputStream = FileOutputStream.$new.overload('java.io.File').call(FileOutputStream, destinationFile);
                var fileInputStreamChannel = fileInputStream.getChannel();
                var fileOutputStreamChannel = fileOutputStream.getChannel();
                fileInputStreamChannel.transferTo(0, fileInputStreamChannel.size(), fileOutputStreamChannel);
                fileInputStream.close();
                fileOutputStream.close();

            }
        } catch (e){
            console.log(`\t[-] Error while retrieving the file: ${e}`);
        }
        console.log(`[+] Done`);

        return this.$init(dexPath, optimizedDirectory, librarySearchPath, parent);
    }
}

function dynamichook(targetClassName){
    var TargetClass;
    var ClassLoaders = Java.enumerateClassLoadersSync();
    for (var i = 0; i < ClassLoaders.length; i++) {
        try {
            TargetClass = Java.ClassFactory.get(ClassLoaders[i]).use(targetClassName);
            console.log(`[+] Found ${targetClassName} class and obtained a wrapper`);
            console.log(`\t [-] Classloader: ${ClassLoaders[i]}\n`);
            break;
        } catch (e) {
            //console.log('\t[-] Failed. Skipping...\n');
        }
    }
    return TargetClass;
}

function analysisEvasion(){
    var ClassLoader = Java.use('java.lang.ClassLoader');
    var targetClass = "c7ed26b86c5eb59e8be0304c202fe6c.cc115b262b452233c6d92952284213c.c52fdb30f146204e6de8395c8b8b264.c5d108dea146d675ef9710d8e41294f"
    let targetClassFound, hooked =  false;
    
    ClassLoader.loadClass.overload('java.lang.String', 'boolean').implementation = function(className, resolve) {
        if (className.includes(targetClass)) {
            targetClassFound = true;
        } 

        let loaded = this.loadClass(className, resolve);

        if (targetClassFound && !hooked) {
            console.log(`[+] ClassLoader.loadClass(${className})\n`);
            console.log(`[+] Hooking anti-evasion methods...\n`);
            hooked = true;
            hookEvasionMethods();
            unpinning();
        }

        return loaded;
    }

    ClassLoader.loadClass.overload('java.lang.String').implementation = function(className) {
        if (className.includes(targetClass)) {
            targetClassFound = true;
        }
        
        let loaded = this.loadClass(className);

        if (targetClassFound && !hooked) {
            console.log(`[+] ClassLoader.loadClass(${className})`);
            console.log(`[+] Hooking anti root methods...`);
            hooked = true;
            hookEvasionMethods();
            unpinning();
        }

        return loaded;
    }
}


function hookEvasionMethods(){
    var antiClass = dynamichook("c7ed26b86c5eb59e8be0304c202fe6c.cc115b262b452233c6d92952284213c.ce595569e1772753d7206fc9bc88685.ce6e818c22799882c6eac222d5eb9a7.cdbba27749697a34872e41b9c94be57.ce42e66e8993edf5a231eb4c12f2338");
    
    antiClass.m5757c69596c29cd57e6fe.overload().implementation = function(){
        console.log(`\t[>] Bypassed m5757c69596c29cd57e6fe!`);
        return false;
    }

    antiClass.m600945c68d699d9c94e7d.overload().implementation = function(){
        console.log(`\t[>] Bypassed m600945c68d699d9c94e7d!`);
        return false;
    }

    var DebugClass = Java.use("android.os.Debug");
    DebugClass.isDebuggerConnected.implementation = function() {
        console.log(`\t[>] Bypassed Debug.isDebuggerConnected()!`);
        return false;
    }
}


function unpinning(){

    // Based on https://codeshare.frida.re/@akabe1/frida-multiple-unpinning/

    // Bypass Chameleon coinspot webkit ssl pinning

    console.log(`[+] Bypassing SSL Pinning...\n`);

    var X509TrustManager = Java.use('javax.net.ssl.X509TrustManager');

    var TrustManager = Java.registerClass({
        name: 'com.sensepost.test.TrustManager',
        implements: [X509TrustManager],
        methods: {
            checkClientTrusted: function (chain, authType) {
            },
            checkServerTrusted: function (chain, authType) {
            },
            getAcceptedIssuers: function () {
                return [];
            }
        }
    });

    var SSLContext = Java.use('javax.net.ssl.SSLContext');

    SSLContext.init.overload('[Ljavax.net.ssl.KeyManager;', '[Ljavax.net.ssl.TrustManager;', 'java.security.SecureRandom').implementation = function (keyManager, trustManager, secureRandom) {
        
        console.log(`\t[>] SSLContext initialized with fake TrustManager`);
        var TrustManagers = [TrustManager.$new()];

        this.init(keyManager, TrustManagers, secureRandom);
    };


    var TrustManagerImpl = Java.use('com.android.org.conscrypt.TrustManagerImpl');

    TrustManagerImpl.verifyChain.implementation = function (untrustedChain, trustAnchorChain, host, clientAuth, ocspData, tlsSctData) {
        console.log(`\t[>] TrustManagerImp is verifying the host ${host}`);
        return untrustedChain;
    }    

    TrustManagerImpl.checkTrustedRecursive.implementation = function(arg1, arg2, arg3, arg4, arg5, arg6) {
        console.log(`\t[>] Tampering TrustManagerImpl check`);
        var ArrayList = Java.use("java.util.ArrayList");
        var checked = ArrayList.$new();
        return checked;
    }

    var WebView = Java.use('android.webkit.WebView');
    WebView.loadUrl.overload("java.lang.String").implementation = function (url) {

        this.setWebContentsDebuggingEnabled(true);
        console.log(`\t[>] Webview debug enabled for the URL ${url}\n`);

        this.loadUrl(url);
    };

}

function hookCommands(){
    var Runtime = Java.use('java.lang.Runtime');

    Runtime.exec.overload('[Ljava.lang.String;').implementation = function(cmd) {
        console.log(`[+] Command executed: ${cmd}\n`);
        return this.exec(cmd);
    };

    Runtime.exec.overload('java.lang.String').implementation = function(cmd) {
        console.log(`[+] Command executed: ${cmd}\n`);
        return this.exec(cmd);
    };

    Runtime.exec.overload('java.lang.String', '[Ljava.lang.String;').implementation = function(cmd, env) {
        var fullcmd = `${cmd} ${JSON.stringify(env)}`;
        console.log(`[+] Command executed: ${fullcmd}\n`);
        return this.exec(cmd, env);
    };

    Runtime.exec.overload('[Ljava.lang.String;', '[Ljava.lang.String;').implementation = function(cmdarr, envp) {
        var fullcmd = cmdarr.join(' ');
        console.log(`[+] Command executed: ${fullcmd}\n`);
        return this.exec(cmdarr, envp);
    };

    Runtime.exec.overload('[Ljava.lang.String;', '[Ljava.lang.String;', 'java.io.File').implementation = function(cmdarr, env, file) {
        var fullcmd = cmdarr.join(' ');
        console.log(`[+] Command executed: ${fullcmd}\n`);
        return this.exec(cmdarr, env, file);
    };

    Runtime.exec.overload('java.lang.String', '[Ljava.lang.String;', 'java.io.File').implementation = function(cmd, env, dir) {
        var fullcmd = `${cmd} ${JSON.stringify(env)} ${dir}`;
        console.log(`[+] Command executed: ${fullcmd}\n`);
        return this.exec(cmd, env, dir);
    };

}


Java.perform(function() {
    console.log('');

    // DCL();

    // classAttributes();
    // debugFiles();
    // debugUnpacking();

    // dumpClasses();

    // hookCommands();
    // analysisEvasion(); 
    
    
});