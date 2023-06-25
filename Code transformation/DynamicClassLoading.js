// Dump loaded classes?
const dump = false;

// Dumpfile name
// The app needs to have permissions on the dump location
const filename = '/data/data/PACKAGE/dump.dex';

// Variable for makePathElements dump. Make sure its writable for app.
const targetDirectory = '/data/local/tmp/dumpDirectory/';


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

function dumpCL(dexPath){  
    const File = Java.use('java.io.File');
    const FileInputStream = Java.use('java.io.FileInputStream');
    const FileOutputStream = Java.use('java.io.FileOutputStream');

    var sourceFile = File.$new(dexPath);

    console.log(`[DCL] Dumping DexPath file into: ${filename}`);
    try{
        if (sourceFile.exists() && sourceFile.canRead()) {
            var destinationFile = File.$new(filename);
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
    console.log(`\t[>] Dump succesful\n`);

}

function DCL(){

    var DexClassLoader = Java.use('dalvik.system.DexClassLoader');

    DexClassLoader.$init.overload('java.lang.String', 'java.lang.String', 'java.lang.String', 'java.lang.ClassLoader').implementation = function (dexPath, optimizedDirectory, librarySearchPath, parent) {
        console.log(`[DCL] DexClassLoader.$init`);
        console.log(`\t[-] File: ${dexPath}\n`);
        //stackTrace();

        if (dump){
            dumpCL(dexPath);
        }

        return this.$init(dexPath, optimizedDirectory, librarySearchPath, parent);
    };


    var PathClassLoader = Java.use('dalvik.system.PathClassLoader');

    PathClassLoader.$init.overload('java.lang.String', 'java.lang.ClassLoader').implementation = function (dexPath, parent) {
        console.log(`[DCL] PathClassLoader.$init`);
        console.log(`\t[-] File: ${dexPath}\n`);
        //stackTrace();

        if (dump){
            dumpCL(dexPath);
        }

        return this.$init(dexPath, parent);
    };

    PathClassLoader.$init.overload('java.lang.String', 'java.lang.String', 'java.lang.ClassLoader').implementation = function (dexPath, librarySearchPath, parent) {
        console.log(`[DCL] PathClassLoader.$init`);
        console.log(`\t[-] File: ${dexPath}\n`);
        //stackTrace();
        if (dump){
            dumpCL(dexPath);
        }
        return this.$init(dexPath, librarySearchPath, parent);
    };


    var InMemoryDexClassLoader = Java.use('dalvik.system.InMemoryDexClassLoader');

    InMemoryDexClassLoader.$init.overload('java.nio.ByteBuffer', 'java.lang.ClassLoader').implementation = function (byteBuffer, parent) {
        console.log(`[DCL] InMemoryDexClassLoader.$init`);
        //stackTrace();
        var object = this.$init(byteBuffer, loader);

        if (dump){
            var remaining = byteBuffer.remaining();

            console.log(`\t[-] Dumping dex into file: ${filename}`);

            const f = new File(filename, 'wb');
            var buf = new Uint8Array(remaining);
            for (var i = 0; i < remaining; i++) {
                buf[i] = byteBuffer.get();
            }
            f.write(buf);
            f.close();

            remaining = byteBuffer.remaining();

            if (remaining > 0) {
                console.log(`\t[-] Error. ${remaining} bytes remaining\n`);
            } else {
                console.log(`\t[>] Successfully dumped dex!\n`);
            }
        }
        
        return object;
    };
    

    try {
        var URLClassLoader = Java.use('dalvik.system.URLClassLoader');

        URLClassLoader.$init.overload('[Ljava.net.URL;').implementation = function (urls) {
            console.log(`[DCL] URLClassLoader.$init`);
            for (var i = 0; i < urls.length; i++) {
                console.log(`\t[-] URL: ${urls[i].toString()}`);
            }
            console.log(``);
            //stackTrace();
            
            return this.$init(urls);
        };

        URLClassLoader.$init.overload('[Ljava.net.URL;', 'java.lang.ClassLoader').implementation = function (urls, parent) {
            console.log(`[DCL] URLClassLoader.$init`);
            for (var i = 0; i < urls.length; i++) {
                console.log(`\t[-] URL: ${urls[i].toString()}`);
            }
            console.log(``);
            //stackTrace();
            return this.$init(urls, parent);
        };

        URLClassLoader.$init.overload('[Ljava.net.URL;', 'java.lang.ClassLoader', 'java.net.URLStreamHandlerFactory').implementation = function (urls, parent, factory) {
            console.log(`[DCL] URLClassLoader.$init`);
            for (var i = 0; i < urls.length; i++) {
                console.log(`\t[-] URL: ${urls[i].toString()}`);
            }
            console.log(``);
            //stackTrace();
            return this.$init(urls, parent, factory);
        };
    } catch(e) {
        console.error(`[+] URLClassLoader couldn't be loaded\n`);
    }

    try{
        var DexFile = Java.use('dalvik.system.DexFile');
        
        DexFile.loadDex.overload('java.lang.String', 'java.lang.String', 'int').implementation = function (dexPath, outputPath, flags) {
            console.log(`[DCL] DexFile.loadDex()`);
            console.log(`\t[-] File: ${dexPath}\n`);
            //stackTrace();
            if (dump){
                dumpCL(dexPath);
            }
            return DexFile.loadDex(dexPath, outputPath, flags);

        };
    } catch(e) {
        console.error(`[+] DexFile couldn't be loaded\n`);
    }


}


function internalAndroidAPI(){

    var DexPathList = Java.use('dalvik.system.DexPathList');
    var Field = Java.use('java.lang.reflect.Field');
    var BaseDexclassLoader = Java.use('dalvik.system.BaseDexClassLoader');

    DexPathList.makePathElements.overload('java.util.List', 'java.io.File', 'java.util.List').implementation = function(list, file, suppressed) {  
        var result = this.makePathElements(list, file, suppressed);
        console.log(`[DCL] makePathElements invoked`);
        console.log(`\t[-] Returned path '${result}'\n`);
        //stackTrace();

        if (dump){ // Dump the dex file
            console.log('\t[>] Retrieving the DEX file. Dumping the Path directory...');
            const File = Java.use('java.io.File');
            const FileInputStream = Java.use('java.io.FileInputStream');
            const FileOutputStream = Java.use('java.io.FileOutputStream');
            const ArrayList = Java.use('java.util.ArrayList');

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
        
                console.log(`\t[>] Directory copied to: ${targetPath}`);
            }
        }
        
        return result;
    };

    DexPathList.makePathElements.overload('java.util.List').implementation = function(list) {
        var result = this.makePathElements(list);
        console.log(`[DCL] makePathElements invoked`);
        console.log(`\t[-] Returned path '${result}'\n`);
        //stackTrace();
        return result;
    };

    Field.get.implementation = function (obj) {
        if (this.getName() == 'pathList' && BaseDexclassLoader.class.isInstance(obj)) {
            console.log(`[DCL] pathList accessed`);
            console.log(`\t[-] Returned path: '${obj.toString()}'\n`);
            //stackTrace();
        }
        return this.get(obj);
    };

    Field.set.implementation = function(obj, value) {
        if (this.getName() == 'pathList' && BaseDexclassLoader.class.isInstance(obj)) {
            console.log(`[DCL] pathList modified`);
            console.log(`\t[-] New path: '${obj.toString()}'\n`);
            //stackTrace();
        } else if (this.getName() == 'dexElements' && DexPathList.class.isInstance(obj)) {
            console.log(`[DCL] dexElements field of DexPathList modified`);
            console.log(`\t[-] New path: '${obj.toString()}'\n`);
            //stackTrace();
        }
        this.set(obj, value);
    };
}

Java.perform(function() {

    console.log('');
    console.log('[*] Hooking Dynamic Code Loading...');
    console.log('');
    DCL();
    console.log('[*] Hooking internal Android API functions: makePathElements & pathList/dexElements...');
    console.log('');
    internalAndroidAPI();
    
});