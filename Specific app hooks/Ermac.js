Java.perform(function () {
    console.log('');
    // findEntryPoint();
    // decryptionFromUnpacker();
    // debugUnpacker();
    // cryptoCipher();
    // hookFileWrites();
    // hookFileCreation();
    // communications();
    // dumpPayload();
    hookFiles();
});

function stackTrace() {
    var ThreadDef = Java.use('java.lang.Thread');
    var ThreadObj = ThreadDef.$new();
    
    console.log(`[+] Printing stack trace...`);
    console.log('---------------------------------------------------------');
    var stack = ThreadObj.currentThread().getStackTrace();
    for (var i = 0; i < stack.length; i++) {
        console.log(`${i}\t| ${stack[i].toString()}`);
    }
    console.log('---------------------------------------------------------');
}

function enumLoadedClasses(){
    Java.enumerateLoadedClasses({
        onMatch: function(className) {
            if (className.includes('tafupqzpqgmn')){
                console.log(`[+] ${className} is currently loaded!`);
            }
        },
        onComplete: function() {}
    });
}

function findEntryPoint(){
    let k = Java.use('com.coffee.weedpi.k');
    k.attachBaseContext.implementation = function (context) {
        console.log(`[+] k.attachBaseContext is called\n`);
        stackTrace();
        this.attachBaseContext(context);
    };
}

function decryptionFromUnpacker(){
    let e = Java.use('com.coffee.weedpi.e');
    e.a.overload('android.content.Context').implementation = function (context) {

        console.log(``);
        console.log(`[>] Instrumenting 'com.coffee.weedpi.e' class`);
        console.log(``);
        
        console.log(`[+] Forcing string decryption routine (com.coffee.weedpi.e.a)...`);
        console.log(`\t[-] Value of a(463): ${this.a(463)}`);
        console.log(`\t[-] Value of a(680): ${this.a(680)}`);
        console.log(`\t[-] Value of a(575): ${this.a(575)}`);
        console.log(`\t[-] Value of a(579): ${this.a(579)}`);
        console.log(`\t[-] Value of a(642): ${this.a(642)}`);
        console.log(`\t[-] Value of a(655): ${this.a(655)}`);
        console.log(`\t[-] Value of a(667): ${this.a(667)}`);
        console.log(``);

        console.log(`[+] Retrieving obfuscated attributes...`);
        console.log(`\t[-] Value of d: ${e.d.value}`);
        console.log(`\t[-] Value of e: ${e.e.value}`);
        console.log(``);
        
        console.log(`[+] Forcing string decryption routine (com.coffee.weedpi.e.a)...`);
        console.log(`\t[-] Value of a(1166): ${this.a(1166)}`);
        console.log(`\t[-] Value of a(1178): ${this.a(1178)}`);
        console.log(`\t[-] Value of a(20): ${this.a(20)}`);
        console.log(`\t[-] Value of a(1186): ${this.a(1186)}`);
        console.log(`\t[-] Value of a(1190): ${this.a(1190)}`);
        console.log(`\t[-] Value of a(1194): ${this.a(1194)}`);
        console.log(`\t[-] Value of a(1207): ${this.a(1207)}`);
        console.log(`\t[-] Value of a(1291): ${this.a(1291)}`);
        console.log(`\t[-] Value of a(1295): ${this.a(1295)}`);
        console.log(`\t[-] Value of a(1476): ${this.a(1476)}`);
        console.log(`\t[-] Value of a(1480): ${this.a(1480)}`);
        console.log(`\t[-] Value of a(1254): ${this.a(1254)}`);
        console.log(`\t[-] Value of a(1258): ${this.a(1258)}`);
        console.log(``);
        
        console.log(`\t[>] Resolving some more decryption calls...`);
        console.log(`\t\t[-] a(3237): ${this.a(3237)}`);
        console.log(`\t\t[-] a(3279): ${this.a(3279)}`);
        console.log(`\t\t[-] a(3620): ${this.a(3620)}`);
        console.log(`\t\t[-] a(3343): ${this.a(3343)}`);
        console.log(`\t\t[-] a(3363): ${this.a(3363)}`);
        
        // fVar.a(context, str2, false)

        this.a(context);


    };
}

function debugUnpacker(){
    let e = Java.use('com.coffee.weedpi.e');
    e.a.overload('android.content.Context').implementation = function (context) {

        console.log(``);
        console.log(`[>] Instrumenting 'com.coffee.weedpi.e' class`);
        console.log(``);

        console.log(`[+] Retrieving obfuscated attributes...`);
        console.log(`\t[-] Value of d: ${e.d.value}`);
        console.log(`\t[-] Value of e: ${e.e.value}`);
        console.log(``);

        console.log(`[+] Obtaining directories...`);
        let appInfo = this.c(context);
        console.log(`\t[-] Source directory: ${appInfo.sourceDir.value}`);
        console.log(`\t[-] Data directory: ${appInfo.dataDir.value}`);
        console.log(``);

        console.log(`[+] Final payload: a(context, new File ${appInfo.sourceDir.value}, new File ${appInfo.dataDir.value}, String '${e.d.value}', String '${e.e.value}')`);
        console.log(``);

        // b(context);
        console.log(`[+] Calling function 'com.coffee.weedpi.e.b'...`);
        console.log(`\t[-] Deleting ${e.d.value}/*`);
        console.log(`\t[-] Deleting directory ${e.d.value}`);
        console.log(``);

        // File a2 = a(context, file2, str);
        console.log(`[+] Calling function 'com.coffee.weedpi.e.a'...`);
        console.log(`\t[-] Creating directory: new File(${appInfo.dataDir.value}, ${e._c.value}).mkdir()`);
        console.log(`\t[-] Creating directory: new File(${appInfo.dataDir.value}/${e._c.value}/, ${e.d.value}).mkdir()`);
        console.log(``);

        console.log(`[+] Creating (fVar): new f(${appInfo.sourceDir.value}, ${appInfo.dataDir.value}/${e._c.value}/${e.d.value})`);
        
        let a = Java.use('com.coffee.weedpi.a');
        console.log(`[+] Creating payload file: ${appInfo.dataDir.value}/${e._c.value}/${e.d.value}/${a.g.value} with RandomAccessFile ${this.a(703)}`);
        
        this.a(context);
    }

    let f = Java.use('com.coffee.weedpi.f');

    f.a.overload('java.util.zip.ZipFile', 'java.util.zip.ZipEntry', 'java.io.File', 'java.lang.String').implementation = function (zipFile, zipEntry, file, str) {

        console.log(``);
        console.log(`[>] Method com.coffee.weedpi.f is called. Deflating ZIP...`);
        console.log(`\t[-] ZipFile: ${zipFile}`);
        console.log(`\t[-] ZipEntry: ${zipEntry}`);
        console.log(`\t[-] File: ${file}`);
        console.log(`\t[-] String: ${str}`);
        console.log(``);
        
        console.log(`[+] Forcing string decryption routine (com.coffee.weedpi.f.a)...`);
        console.log(`\t[-] Value of a(1391): ${this.a(1391)}`);
        console.log(`\t[-] Value of a(1416): ${this.a(1416)}`);
        console.log(`\t[-] Value of a(1468): ${this.a(1468)}`);
        console.log(`\t[-] Value of a(1605): ${this.a(1605)}`);
        console.log(``);
        this.a(zipFile, zipEntry, file, str);
    };

    f.c.implementation = function () {
        //console.log(`f.c is called`);
        let result = this.c();
        var ArrayList = Java.use('java.util.ArrayList');
        console.log(`[+] Array with classes inserted (com.weedpi.f.c): ${Java.cast(result, ArrayList)}`);
        return result;
    };

}


function dumpPayload(){
    let e = Java.use('com.coffee.weedpi.e');
    e.a.overload('java.lang.ClassLoader', 'java.io.File', 'java.util.List').implementation = function (classLoader, file, list) {
        console.log(`[+] e.a is called`);
        console.log(`\t[-] ClassLoader: ${classLoader}`);
        console.log(`\t[-] File: ${file}`);
        console.log(`\t[-] List: ${list.value}\n`);
        
        this.a(classLoader, file, list);
    };


    let f = Java.use('com.coffee.weedpi.f');
    f.a.overload('android.content.Context', 'java.lang.String', 'boolean').implementation = function (a, b, c) {
        console.log(`[+] f.a is called`);
        console.log(`\t[-] String: ${b}`);
        console.log(`\t[-] Boolean: ${c}`);

        let result = this.a(a, b, c);
        console.log(`\t[-] Result: ${result.value}\n`);
        return result;
    };

    var log = false;
    e.a.overload('java.lang.Object', 'java.lang.String', '[Ljava.lang.Class;').implementation = function (obj, str, clsArr) {
        console.log(`[+] e.a is called`);
        console.log(`\t[-] obj: ${obj}`);
        console.log(`\t[-] str: ${str}`);
        console.log(`\t[-] clsArr: ${clsArr}`);

        let result = this.a(obj, str, clsArr);
        console.log(`\t[-] Result: ${result}\n`);

        log = true;
        return result;
    };

    
    let test = Java.use('dalvik.system.DexPathList');
    test.makePathElements.overload('java.util.List', 'java.io.File', 'java.util.List').implementation = function(list, file, arrayList){
        console.log(`\n[+] DexPathList is called`);
        console.log(`\t[-] List: ${list}`);
        console.log(`\t[-] File: ${file}`);
        console.log(`\t[-] ArrayList: ${arrayList}\n`);

      
        console.log('[+] Retrieving the DEX file. Dumping the Path directory...');

        const File = Java.use('java.io.File');
        const FileInputStream = Java.use('java.io.FileInputStream');
        const FileOutputStream = Java.use('java.io.FileOutputStream');
        const ArrayList = Java.use('java.util.ArrayList');

        const targetDirectory = '/data/local/tmp/dumpDirectory/';

        if (file.isDirectory()) {
            const sourceDirectory = file.getAbsolutePath();
            const targetPath = targetDirectory + file.getName();
    
            const targetDir = File.$new(targetPath);
            targetDir.mkdirs();
    
            // Copy all files from the source directory to the target directory
            const fileList = ArrayList.$new(arrayList);
            const fileCount = fileList.size();
            for (let i = 0; i < fileCount; i++) {
                const sourceFile = fileList.get(i);
                const targetFile = File.$new(targetPath, sourceFile.getName());
    
                const inputStream = FileInputStream.$new(sourceFile);
                const outputStream = FileOutputStream.$new(targetFile);
                const buffer = Array.apply(null, Array(1024)).map(function() { return 0; });
                let length;
                while ((length = inputStream.read(buffer)) !== -1) {
                    outputStream.write(buffer, 0, length);
                }
                inputStream.close();
                outputStream.close();
            }
    
            console.log(`[+] Directory copied to: ${targetPath}`);
        }
        
        return this.makePathElements(list, file, arrayList);
    }
        
}

function byteArray2String(bytearray){
    var buffer = Java.array('byte', bytearray);
    var result = '';
    for(var i = 0; i < buffer.length; ++i){
        result += (String.fromCharCode(buffer[i] & 0xff)); // here!!
    }
    return result;
}

function string2ByteArray(str){
    var result = [];
    for(var i = 0; i < str.length; ++i){
        result.push(str.charCodeAt(i) & 0xff);
    }
    return result;
}

function bin2hex(array, length) {
    var result = '';

    length = length || array.length;

    for (var i = 0; i < length; ++i) {
        result += ('0' + (array[i] & 0xFF).toString(16)).slice(-2);
    }
    return result;
}

function cryptoCipher(){
    console.log('[+] Intercepting communications...\n');
    var cipher = Java.use('javax.crypto.Cipher');

    cipher.doFinal.overload('[B').implementation = function (b) {
        let result = cipher.doFinal.overload('[B').call(this, b);            
        console.log('[+] Cipher.doFinal called:');
        console.log(`\t[-] Outgoing message: ${byteArray2String(b)}`);
        console.log(`\t[-] Received message: ${byteArray2String(result)}\n`);
        
        if (byteArray2String(b).includes('action')){
            stackTrace();
        }
        
        return result;
    };

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
            console.log('\t[-] Failed. Skipping...\n');
        }
    }
    return TargetClass;

}


function communications(){

    function hookComms() {
        let b2 = dynamichook('com.tafupqzpqgmn.tmnhkq.feda.mutigaro');

        b2.h.implementation = function (obj) {
            console.log(`[+] b.sendComms is called`);
            let result = this.h(obj);
            //console.log(`[-] Result: ${result}`);
            stackTrace();
            console.log('');
            return result;
        };

        let c = dynamichook('n0.c');
        c.r.implementation = function (context, str, dVar) {
            console.log(`[+] c.r is called`);

            let parts = str.split('&');
            let action = parts[0].split('=')[1];
            let data = decodeURIComponent(parts[1].split('=')[1]);

            console.log(`\t[-] Action: ${action}`);
            console.log(`\t[-] Data: ${data}\n`);

            let result = this.r(context, str, dVar);
            //console.log(`\t[-] Result: ${result}\n`);
            stackTrace();

            return result;
        };

        let b = Java.use('r0.a$b');
        b.$init.implementation = function (str, str2, oVar, dVar) { 

            console.log(`[+] b.$init is called`);

            console.log(`\t[-] C2 URL: ${str}`); // http://185.215.113.42:3000/gate.php
            console.log(`\t[-] Data (base64): ${str2}\n`);

            // let data = Java.use('android.util.Base64').decode(str2, 0);
            // let decodedString = Java.use('java.lang.String').$new(data);
            // console.log(`\t[-] Decoded data: ${decodedString}\n`);

            this.$init(str, str2, oVar, dVar);
        };
    }

    var ClassLoader = Java.use('java.lang.ClassLoader');

    ClassLoader.loadClass.overload('java.lang.String').implementation = function(className) {
        var log = false;
        if (className.includes("mutigaro")) {
            log = true;
        }
        
        if (log) {
            console.log(`[REFLECTION] ClassLoader.loadClass(${className})\n`);
            //stackTrace();
        }

        let aux = ClassLoader.loadClass.overload('java.lang.String').call(this, className)

        if (log) {
            hookComms();
            log = false;
        }
        return aux;
    }

    ClassLoader.loadClass.overload('java.lang.String', 'boolean').implementation = function(className, resolve) {
        var log = false;
        if (className.includes("mutigaro")) {
            log = true;
        }
        
        if (log) {
            console.log(`[REFLECTION] ClassLoader.loadClass(${className})\n`);
            //stackTrace();
        }
        let aux = ClassLoader.loadClass.overload('java.lang.String', 'boolean').call(this, className, resolve);
        
        if (log) {
            hookComms();
            log = false;
        }
        return aux;

    }

}