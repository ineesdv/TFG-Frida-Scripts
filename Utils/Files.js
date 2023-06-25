function byteArrayToString(byteArray) {
    const buffer = Java.array('byte', byteArray);
    return String.fromCharCode.apply(null, buffer);
}

function stackTrace() {
    console.log(`[+] Printing stack trace...`);
    console.log("---------------------------------------------------------");
    var stack = ThreadObj.currentThread().getStackTrace();
    for (var i = 0; i < stack.length; i++) {
        console.log(`${i}| ${stack[i].toString()}`);
    }
    console.log("---------------------------------------------------------");
}

Java.perform(function(){

    hookFiles();

});

function hookFiles(){

    const creation = true;
    const write = false;
    const read = true;

    const File = Java.use("java.io.File");
    const FileInputStream = Java.use('java.io.FileInputStream');
    const FileOutputStream = Java.use('java.io.FileOutputStream');

    if (creation){
        File.$init.overload('java.io.File', 'java.lang.String').implementation = function(file, filename) {
            console.log('[FILE] [CREATION] File$init called');
            console.log(`[-] Name: ${filename}\n`);
            return this.$init(file, filename);
        };
        File.$init.overload('java.lang.String').implementation = function(filename) {
            console.log('[FILE] [CREATION] File$init called');
            console.log(`[-] Name: ${filename}\n`);
            return this.$init(filename);
        };
        File.$init.overload('java.lang.String', 'java.lang.String').implementation = function(parent, child) {
            console.log('[FILE] [CREATION] File$init called');
            const filename = parent + '/' + child;
            console.log(`[-] Name: ${filename}\n`);
            return this.$init(parent, child);
        };
        File.$init.overload('java.net.URI').implementation = function(uri) {
            console.log('[FILE] [CREATION] File$init called');
            console.log(`[-] URI: ${uri.getPath()}\n`);
            return this.$init(uri);
        }; 
        FileInputStream.$init.overload('java.io.File').implementation = function(file) {
            console.log('[FILE] [CREATION] FileInputStream.$init called');
            console.log(`[-] Name: ${file.getAbsolutePath()}\n`);
            return this.$init(file);
        };
        FileInputStream.$init.overload('java.io.FileDescriptor').implementation = function(fd) {
            console.log('[FILE] [CREATION] FileInputStream.$init called');
            console.log(`[-] File descriptor: ${fd}\n`);
            return this.$init(fd);
        };
        FileInputStream.$init.overload('java.lang.String').implementation = function(filename) {
            console.log('[FILE] [CREATION] FileInputStream.$init called');
            console.log(`[-] Name: ${filename}\n`);
            return this.$init(filename);
        };
        FileOutputStream.$init.overload('java.io.File').implementation = function(file) {
            console.log('[FILE] [CREATION] FileOutputStream.$init called');
            console.log(`[-] Name: ${file.getAbsolutePath()}\n`);
            return this.$init(file);
        };
        FileOutputStream.$init.overload('java.io.File', 'boolean').implementation = function(file, append) {
            console.log('[FILE] [CREATION] FileOutputStream.$init called');
            console.log(`[-] Name: ${file.getAbsolutePath()}\n`);
            return this.$init(file, append);
        };
        FileOutputStream.$init.overload('java.io.FileDescriptor').implementation = function(fd) {
            console.log('[FILE] [CREATION] FileOutputStream.$init called');
            console.log(`[-] File descriptor: ${fd}\n`);
            return this.$init(fd);
        };
        FileOutputStream.$init.overload('java.lang.String').implementation = function(filename) {
            console.log('[FILE] [CREATION] FileOutputStream.$init called');
            console.log(`[-] Name: ${filename}\n`);
            return this.$init(filename);
        };
        FileOutputStream.$init.overload('java.lang.String', 'boolean').implementation = function(filename, append) {
            console.log('[FILE] [CREATION] FileOutputStream.$init called');
            console.log(`[-] Name: ${filename}\n`);
            return this.$init(filename, append);
        };
    }
    
    if (write){
        
        let dump = false;
        const dumpFile = '/data/local/tmp/dumpData.txt';
        
        FileOutputStream.write.overload('[B').implementation = function(buffer) {
            console.log('[FILE] [WRITE] FileOutputStream.write called');
            //console.log(`[-] Data: ${byteArrayToString(buffer)}`);
            if (dump) {
                console.log(`[-] Dumping file. Location: ${dumpFile}`);
                const outputStream = FileOutputStream.$new(dumpFile);
                outputStream.write(buffer);
                outputStream.close();
            }
            console.log('');
            return this.write(buffer);
        };
        
        FileOutputStream.write.overload('int').implementation = function(oneByte) {
            console.log('[FILE] [WRITE] FileOutputStream.write called');
            console.log(`[-] Data: ${oneByte}\n`);
            
            return this.write(oneByte);
        };
        
        FileOutputStream.write.overload('[B', 'int', 'int').implementation = function(buffer, offset, count) {
            console.log('[FILE] [WRITE] FileOutputStream.write called');

            if (dump) {
                console.log(`[-] Dumping file. Location: ${dumpFile}`);
                const outputStream = FileOutputStream.$new(dumpFile);
                outputStream.write(buffer, offset, count);
                outputStream.close();
            }
            console.log('');
            return this.write(buffer, offset, count);
        };
    }

    if (read) {
        FileInputStream.read.overload().implementation = function () {
            console.log('[FILE] [READ] FileInputStream.read called');
            const result = this.read();
            // console.log(`[-] Data: ${result}`);
            console.log('');
            return result;
        };
        
        // FileInputStream.read(byte[])
        FileInputStream.read.overload('[B').implementation = function (buffer) {
            console.log('[FILE] [READ] FileInputStream.read called\n');
            const result = this.read(buffer);
            return result;
        };
        
        // FileInputStream.read(byte[], int, int)
        FileInputStream.read.overload('[B', 'int', 'int').implementation = function (buffer, offset, count) {
            console.log('[FILE] [READ] FileInputStream.read called\n');
            const result = this.read(buffer, offset, count);
            return result;
        };
    }


}


    // // native hooks    
    // Interceptor.attach(
    //     Module.findExportByName("libc.so", "read"), {
    //         // fd, buff, len
    //         onEnter: function(args) {
    //             if (CONFIG.printLibc === true) {
    //                 var bfr = args[1],
    //                     sz = args[2].toInt32();
    //                 var path = (TraceSysFD["fd-" + args[0].toInt32()] != null) ? TraceSysFD["fd-" + args[0].toInt32()] : "[unknow path]";

    //                 prettyLog("[Libc::read] Read FD (" + path + "," + bfr + "," + sz + ")\n" +
    //                     rawPrint(path, Memory.readByteArray(bfr, sz)));
    //             }
    //         },
    //         onLeave: function(ret) {

    //         }
    //     }
    // );

    // Interceptor.attach(
    //     Module.findExportByName("libc.so", "open"), {
    //         // path, flags, mode
    //         onEnter: function(args) {
    //             this.path = Memory.readCString(args[0]);
    //         },
    //         onLeave: function(ret) {
    //             TraceSysFD["fd-" + ret.toInt32()] = this.path;
    //             if (CONFIG.printLibc === true)
    //                 prettyLog("[Libc::open] Open file '" + this.path + "' (fd: " + ret.toInt32() + ")");
    //         }
    //     }
    // );


    // Interceptor.attach(
    //     Module.findExportByName("libc.so", "write"), {
    //         // fd, buff, count
    //         onEnter: function(args) {
    //             if (CONFIG.printLibc === true) {
    //                 var bfr = args[1],
    //                     sz = args[2].toInt32();
    //                 var path = (TraceSysFD["fd-" + args[0].toInt32()] != null) ? TraceSysFD["fd-" + args[0].toInt32()] : "[unknow path]";

    //                 prettyLog("[Libc::write] Write FD (" + path + "," + bfr + "," + sz + ")\n" +
    //                     rawPrint(path, Memory.readByteArray(bfr, sz)));
    //             }
    //         },
    //         onLeave: function(ret) {

    //         }
    //     }
    // );

